---
title: First steps | Gengo API
---

# First steps

### Follow these steps to get going with the API without any bumps:

1. [Create a sandbox account and obtain an API key.](#step-1-create-a-sandbox-account-and-obtain-an-api-key)
2. [Play in the sandbox with your API keys.](#step-2-play-in-the-sandbox-with-your-api-keys)
    * [Basic example: GET language pairs](#basic-get-call)
    * [Basic example: POST to translate/jobs](#basic-post-call)
3. Setting a default callback and testing it. (Coming soon)

## Step 1: Create a sandbox account and obtain an API key
Every API call must be authorized using an API key. While you're testing, you should use the sandbox and generate your keys from there. In this tutorial I will show you how to create a sandbox account, so that you can get your API keys to make calls to the Gengo Translate API.

First you need to create a free sandbox account. Click "Create a sandbox account" below, enter your email and password, and verify your account through the email sent to you.

[Create a sandbox account](https://sandbox.gengo.com/auth/form/signup/)

After logging in, go to your Account section, and click on "API settings" in the right-hand menu.

This is where your API keys will be stored. To create a new key, click "Generate Key".

Each public key has a corresponding private key and callback URL. The public key is what identifies you - kinda like your login name. The private key is like your password - do NOT share it with anyone, or they may be able to access your account. The callback URL is helpful if you want Gengo to send status updates about the progress of your job to your server or application.

Copy the public and private keys so you can use them in your application.

    #!php
    <?php
    $public_key = "rspZJxEnswelpvS0)tdwM]7uPjkcgR%@k_mN[Z1ac_3a=#EN%r=]cKwxq98-XQdK";
    $private_key = "IlUyZP5TISBSxRzEm0mil$L}-0FxeX(24W1d#TkY{qNkh42Q3B}m2)XJi_nYqrl^";
    ?>

That's it! In the next step we'll show some API calls in action.

##Step 2: Play in the sandbox with your API keys

### Basic GET call
In this tutorial I will demonstrate how to make API calls using some command-line PHP scripts. In all examples, we'll assume the following constant values:

    #!php
    <?php
    $url = 'http://api.sandbox.gengo.com/v2/';
    $public_key = "rspZJxEnswelpvS0)tdwM]7uPjkcgR%@k_mN[Z1ac_3a=#EN%r=]cKwxq98-XQdK";
    $private_key = "IlUyZP5TISBSxRzEm0mil$L}-0FxeX(24W1d#TkY{qNkh42Q3B}m2)XJi_nYqrl^";
    $response_type = 'json'; // choose response type; 'json' or 'xml'
    $header = array('Accept: application/'.$response_type);
    ?>


### Retrieving language pairs

First we'll make a simple call to retrieve a list of translation language pairs.


    #!php
    <?php
    $query = array('api_key' => $public_key);
    $query = http_build_query($query);

    $url .= 'translate/service/language_pairs?' . $query;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    $response = curl_exec($ch);
    curl_close($ch);
    print_r(json_decode($response));
    ?>


Return value:

<%= headers 200 %>
<%= json :lang_pairs %>

What we get back is data about each supported language pair, including the quality level (or tier) and unit price.

So, that's a very simple example of how to retrieve data through the Gengo Translate API.

### Basic POST call

Now let's submit some jobs for human translation. The sandbox allows users to quickly add fake credits so you can easily submit jobs. First, login and add some fake credits to your account.

Once that's done, open the example jobs-post.php script and edit fields for two jobs to submit. Add some text to have translated in the 'body_src' field, and check that the source, target, and tier parameters are what we want. We can also send some custom data to associate with each job; this is data specific to your service and won't be touched at any time. Custom data will be returned verbatim whenever the job is requested.


    #!php
    <?php
    $job1 = array(
        'slug' => 'job test 1',
        'body_src' => 'one two three four',
        'lc_src' => 'en',
        'lc_tgt' => 'ja',
        'tier' => 'standard',
        'auto_approve' => 1,
        'custom_data' => 'some custom data untouched by Gengo.',
        );

    $job2 = array(
        'slug' => 'job test 2',
        'body_src' => 'five six seven eight',
        'lc_src' => 'en',
        'lc_tgt' => 'ja',
        'tier' => 'standard',
        'comment' => 'This one has a comment.'
        );

    $jobs = array('job_1' => $job1, 'job_2' => $job2);
    $data = array('jobs' => $jobs);

    // if you wanted these done by the same translator, add the "as_group" parameter
    // $data = array('jobs' => $jobs, 'as_group' => 1);

    $params = array(
        'api_key' => $api_key,
        'ts' => gmdate('U'),
        'data' => json_encode($data)
    );


    $hmac = hash_hmac('sha1', $params['ts'], $private_key);
    $params['api_sig'] = $hmac;
    $enc_params = json_encode($params);

    $url .= 'translate/jobs';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    $response = curl_exec($ch);
    curl_close($ch);
    ?>


You'll want to review documentation for the "translate/jobs" entry-point to see what other parameters are available, but for this example we will turn job-grouping off (which means different translators can work on each job).

So, let's post these two jobs:

<pre class='terminal'>
php -f jobs-post.php
</pre>

The response will let you know various statistics about the order:

<%= headers 200 %>
<%= json :jobs_post %>

In the response from a job `post`, one of the most important pieces of info is the `order id`, which can be used to retrieve information about the order, such as the job ids of the jobs placed:

<%= headers 200 %>
<%= json :jobs_order_get %>
