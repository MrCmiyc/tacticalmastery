<?php

//date_default_timezone_set('America/Los_Angeles');

class Deploy {

    /**
     * The name of the file that will be used for logging deployments. Set to
     * FALSE to disable logging.
     *
     * @var string
     */
    private $_log = '/tmp/git_deploy.log';

    /**
     * The timestamp format used for logging.
     *
     * @link    http://www.php.net/manual/en/function.date.php
     * @var     string
     */
    private $_date_format = 'Y-m-d H:i:s';

    /**
     * The name of the branch to pull from.
     *
     * @var string
     */
    private $_branch = 'master';

    /**
     * The name of the remote to pull from.
     *
     * @var string
     */
    private $_remote = 'origin';

    /**
     * The directory where your  git repository is located, can be
     * a relative or absolute path
     *
     * @var string
     */
    private $_directory = '/home/www-data/repo/tm.git';
    private $_workDirectory = '/var/www/staging.tacticalmastery.com';

    public function __construct() {
        $this->log('Deployment started ...');
    }

    /**
     * Writes a message to the log file.
     *
     * @param  string  $message  The message to write
     * @param  string  $type     The type of log message (e.g. INFO, DEBUG, ERROR, etc.)
     */
    public function log($message, $type = 'INFO') {
        if ($this->_log) {
            // Set the name of the log file
            $filename = $this->_log;

            if (!file_exists($filename)) {
                // Create the log file
                file_put_contents($filename, '');

                // Allow anyone to write to the log files
                chmod($filename, 0666);
            }

            // Write the message into the log file
            // Format: time --- type: message
            file_put_contents($filename, date($this->_date_format) . ' --- ' . $type . ': ' . $message . PHP_EOL, FILE_APPEND);
        }
    }

    /**
     * Executes the necessary commands to deploy the website.
     */
    public function execute() {
        try {
            // Update the local repository
            exec("/usr/bin/git --git-dir={$this->_directory} fetch {$this->_remote} +{$this->_branch}:{$this->_branch} 2>&1", $output, $exitval);
            $this->log('Pulling in changes... ' . implode("\n", $output));
            if ($exitval == 0) {
                if (strstr(implode('', $output), '..')) {
                    unset($output);
                    // Checkout the repo
                    exec("/usr/bin/git --git-dir={$this->_directory} --work-tree={$this->_workDirectory} checkout -f {$this->_branch} 2>&1", $output);
                    $this->log("Checkout {$this->_branch}... " . implode("\n", $output));
                    unset($output);
                    
                    $this->log("Purging the CDNs.");
                    exec("sudo HOME=/home/www-data -u www-data /var/data/api/purge_cloudfront.sh >>{$this->_log} 2>&1");
                    exec("/var/data/api/purge_hiberniacdn.sh >>{$this->_log} 2>&1");
                    exec("/var/data/api/purge_highwinds.sh >>{$this->_log} 2>&1");
                    
                    $this->log("Deployment successful. Starting the tests.");
                    chdir($this->_workDirectory . '/tests/codecept');
                    exec("rm -f {$this->_workDirectory}/tests/codecept/tests/_output/*");
                    exec("/usr/local/bin/codecept run acceptance >>{$this->_log} 2>&1");
                } else {
                    $this->log("Nothing new in the {$this->_branch} branch\n");
                }
            } else {
                $this->log('Errors with the deployment', 'ERROR');
            }
        } catch (Exception $e) {
            $this->log($e, 'ERROR');
        }
    }

}

// Send response immediatelly
$response = 'Got it';
header("Content-Encoding: none");
header('Content-Length: ' . strlen($response));
header('Connection: close');
echo $response; // send the response
flush();

// Do the job
$deploy = new Deploy();
$deploy->execute();
