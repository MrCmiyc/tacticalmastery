<?php
$code = '3afc8d6ab6f6b4b11ff24dc8c7b414beaa538ba697c11b38e186706d02838ff1';
if (!isset($_GET['key']) || $_GET['key'] !== $code) {
    die('<h1>This is a page for internal use. You are not welcome here if you don\'t know the key!</h1>');
}

        const STAGING_LOG = 'Staging log';
        const SECURE_LOG = 'Secure log';
        const WWW_LOG = 'WWW log';
        const TM_LOG = 'TM log';
        const DEPLOY_LOG = 'Deployments log';
        const HTTP_ERRORS = 'Http errors';
        const PHANTOMJS_LOG = 'PhantomJs Log';
        const API_LOG = 'API Log';

$constants = [
    STAGING_LOG => 'STAGING_LOG_PATH',
    SECURE_LOG => 'SECURE_LOG_PATH',
    WWW_LOG => 'WWW_LOG_PATH',
    TM_LOG => 'TM_LOG_PATH',
    DEPLOY_LOG => 'DEPLOY_LOG_PATH',
    HTTP_ERRORS => 'HTTP_ERRORS_PATH',
    PHANTOMJS_LOG => 'PHANTOMJS_LOG_PATH',
    API_LOG => 'API_LOG_PATH',
];

if (file_exists(__DIR__ . '/paths.php')) {
    include_once __DIR__ . '/paths.php';
}

$files = [
    STAGING_LOG => defined('STAGING_LOG_PATH') ? STAGING_LOG_PATH : '/var/log/nginx/staging.tacticalmastery.com.access_log',
    SECURE_LOG => defined('SECURE_LOG_PATH') ? SECURE_LOG_PATH : '/var/log/nginx/staging.tacticalmastery.com.access_log',
    WWW_LOG => defined('WWW_LOG_PATH') ? WWW_LOG_PATH : '/var/log/nginx/www.tacticalmastery.com.access_log',
    TM_LOG => defined('TM_LOG_PATH') ? TM_LOG_PATH : '/var/log/nginx/tacticalmastery.com.access_log',
    DEPLOY_LOG => defined('DEPLOY_LOG_PATH') ? DEPLOY_LOG_PATH : '/tmp/git_deploy.log',
    PHANTOMJS_LOG => defined('PHANTOMJS_LOG_PATH') ? PHANTOMJS_LOG_PATH : '/tmp/phantomjs.log',
    HTTP_ERRORS => defined('HTTP_ERRORS_PATH') ? HTTP_ERRORS_PATH : '/var/log/nginx/error.log',
    API_LOG => defined('API_LOG_PATH') ? API_LOG_PATH : '/var/log/nginx/api.access_log',
];

if (isset($_POST['action']) && $_POST['action'] === 'getData' && isset($_POST['fileKey'])) {
    echo actionGetLogFile($_POST['fileKey'], $files, $constants);
    exit;
}

function actionGetLogFile($fileKey, $files, $constants) {
    if (array_key_exists($fileKey, $files)) {
        if (is_file($files[$fileKey])) {
            return htmlentities(substr(file_get_contents($files[$fileKey]), -100000));
        } else {
            return "File not found!\nMaybe you should define the constant <b>" . $constants[$fileKey] . "</b> in your local <b>paths.php</b> file";
        }
    } else {
        return "Unknown log file";
    }
}

function ajaxButton($name, $action, $ajaxOptions, $options) {
    return "<button id='{$options['id']}' class='{$options['class']}' style='{$options['style']}'>$name</button>\n" .
        "<script>"
            . "$('#{$options['id']}').click(function(){
            $.ajax({
                type: '{$ajaxOptions['type']}',
                url: '$action',
                data: '". http_build_query($ajaxOptions['data']) . "' ,
                success: {$ajaxOptions['success']}
                });
           });
       </script>";
}

?>
<html>
    <head>
        <title>TM reports</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <?php
        foreach (array_keys($files) as $key => $file) {
            echo ajaxButton($file, "/scripts/php/report.php?key=$code", [
                'type' => 'POST',
                'data' => [
                    'action' => 'getData',
                    'fileKey' => $file,
                    ],
                'success' => 'function(html){
                        $("#fileContent").html(html);
                        $("#fileContent").scrollTop($("#fileContent").prop("scrollHeight"));
                        $("#btn_' . $key . '").blur();
                    }',
                    ], [
                'style' => 'margin-right: 5px;',
                'class' => 'btn btn-primary',
                'id' => "btn_$key"
            ]);
        }
        ?>
        <pre id="fileContent" style="overflow: scroll; width: 1200px; max-height: 700px; margin-top: 15px;"></pre>
    </body>
</html>