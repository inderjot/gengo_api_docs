---
title: UI recommendations | Gengo API
---

# UI recommendations

This document will help you implement a UI for your API connection to Gengo. If you need more information refer to our Translation API documentation (especially <a href='/overview'>System Overview</a>, <a href='/v2/first_steps'>API First Steps</a> and <a href='/v2/best_practices'>Best Practices for Plugins & API Usage</a>), or <a href="mailto:api@gengo.com?Subject=Client%20library%20request">contact support</a>.

### Things to remember when implementing a UI for Gengo translation

* Make it clear to the user when they place an order that the translation will cost money
* Use the natural workflow of your app — only add extra panels if you have to
* Stick to Gengo UI terminology wherever possible for consistency (as users may also use e.g. the Gengo web interface)
    * …but make sure UI terms make sense to your users
* If using placeholder machine pre-translation, make it clear to the user when the content is machine translated
* Include help information from Gengo (or links to it) where possible
* Keep it simple


### What Gengo-related panels should your app have?

Your app will need to display various panels, with content going back and forth to Gengo. Here are the recommended panels based on the Gengo API, with example wireframes. See <a href='http://gengo.com/express/dashboard/'>Gengo’s web interface</a> for example implementations.

__Note:__ While you can combine or omit some panels, ensure your Gengo implementation covers the core functions (order, review, approve) and is easy for your users.

### Panels

The Gengo API allows you to order one or more translations at once. The terms we use are:

* __Job__ — One piece of content to be translated. A job is the “atomic unit” of Gengo translation.
* __Group of jobs__ — When ordering more than one job (such as the title, body and keywords fields of a blog post), you can choose to have them be handled by the same translator. This gives a more consistent translation, but will take longer to complete. A group of jobs must have the same settings — source and target languages, and translation tier.

__Note:__ While the core unit of the Gengo API is a “job”, please maintain consistency with the Gengo web experience and use the term “translation” in your UI.

<a href='#order-translation-panel'>Order translation panel</a>
: The user confirms the settings for translating some content and places an order (a job, a group of jobs, or multiple jobs)

<a href='#translation-jobs-overview-list'>Translation jobs overview list</a>
: The user can see the status of their translation jobs

<a href='#pending-job-panel'>Pending job panel</a>
: The user can cancel the job, and optionally see placeholder machine translation, and/or the job’s estimated translation time

<a href='#comment-thread-panel'>Comment thread panel</a>
: The user can see comments regarding a job, optionally with previous versions of the translation

<a href='#comment-submission-panel'>Comment submission panel</a>
: The user can send a comment to the job’s translator

<a href='#translation-job-review-panel'>Translation job review panel</a>
: The user can accept a completed job, or potentially request corrections, reject the job, or provide feedback when accepting the job

<a href='#feedback-panel'>Feedback panel</a>
: The user can provide feedback when accepting a completed translation (as part of the translation job review panel), and optionally add the translator to a “preferred translators” list

<a href='#approved-translation-panel'>Approved translation panel</a>
: The user can see information about a job they approved, including the translated text

<a href='#request-revisions-panel'>Request revisions panel</a>
: The user can formally request a correction, choosing a reason and submitting a comment

<a href='#job-rejection-panel'>Job rejection panel</a>
: After successfully passing captcha the user can reject a translation (passing the job to a new translator), or optionally reject and cancel the translation. The user must choose a reason for the rejection and submit feedback.

<a href='#settings-panel'>Settings panel</a>
: The user can specify settings related to translation

## Views

### Order translation panel

In this view the user will confirm the settings for translating one (or more) pieces of content and place an order. Depending on your app this might be a step in a publishing process, a part of another panel, or an individual panel within your system. You can allow the user to bundle a group of translations with the same settings together (a group of jobs), and to order multiple translations with different settings at the same time. Refer to the <a href='/v2/jobs/post'>translate/jobs (POST)</a> method and <a href='/v2/payloads'>Translate API - Job Payload</a> for more information.

_The following apply per job or group of jobs:_

__Required__

* Allow the user to select the source and target languages (lc_src and lc_tgt respectively)
* Allow the user to select the translation tier, including machine translation (tier)
* Indicate the content to be translated (body_src)
* Display the _unit count_ of the content to be translated (excluding units inside [[[…]]]). Note that 'unit count' means word count or character count for <a href='http://en.wikipedia.org/wiki/CJK_characters'>CJK languages</a>
* Show the price at the chosen translation tier for the job or group of jobs (= unit price of language pair at selected translation tier × translatable unit count)

__Note:__ Users can wrap any text they don’t want translated in [[[…]]] (triple square brackets). For example, in “My teacher gave us [[[ 7 apples ]]] today”, the phrase “7 apples” won’t be translated. This feature is quite popular, so let your users know about it if possible.

__Caution:__ If calculating unit count and price, don’t include units inside [[[…]]].

### Recommended

* Suggest the source language by pre-checking the content to be translated
* Allow the user to add a comment for the translator (comment)
* Allow the user to order multiple jobs, or a group of jobs, at once
    * Allow the user to order a group of jobs with the same translation settings (as_group)
        * Preferably pre-set this according to the UI of your app, e.g. for a blog post include the post’s title, body and keywords fields as a group of jobs
    * Allow the user to request translations in multiple languages in a single order (by creating one job per target language)
* If there’s more than one job show the order’s total price

### If possible

* Allow the user to set automatic job approval per job (auto_approve)
* Show the estimated translation time (eta)
* An option to use preferred translators, per job/group of jobs or per order (use_preferred)

__Note:__ Preferred translators are translators the user has indicated they’d prefer to use again in a previous job’s feedback form, after evaluating the translator’s output. For a language pair, the user must have selected at least two preferred translators before this option is available.

<figure>
    <img src="/images/ui_recommendations/order-translation.png">

    <figcaption>
    <p>
        A minimal translation order panel wireframe
    </p>
    <p>
        Normal method: <a href="/v2/jobs/post"><code>translate/jobs (POST)</code></a>
    </p>
    </figcaption>
</figure>

<figure>
    <img src="/images/ui_recommendations/order-translation-group.png">
    <figcaption>
    <p>
        A translation panel wireframe for a group of jobs (preset by the application)
    </p>
    <p>
        Normal method: <a href="/v2/jobs/post"><code>translate/jobs (POST)</code></a> as an array of job payloads (one per <code>body_src</code>)
    </p>
    </figcaption>
</figure>

### Translation jobs overview (essential)

This shows the current status of all translations that have been ordered through Gengo (ref: <a href='/v2/jobs/get'>translate/jobs (GET)</a> method and <a href='/payloads'>Job payload response</a>). You might make it a separate page, or simply add the information from Gengo to an existing UI. Content management systems often have a list of all articles, which can be a good place to add it.

__Statuses of jobs__

unpaid
: Not enough funds to translate

available
: Awaiting translator

pending
: Translating

reviewable
: Translated and awaiting approval

approved
: User-approved translation

rejected
: User-rejected translation awaiting new translatorcanceledUser canceled the translation before it began or when rejecting it

_The following apply per job or group of jobs:_

__Required__

* Status (status)
* Timestamp when job was received by Gengo (ctime)
* Translation tier (tier)
* Source and target languages (lc_src and lc_tgt respectively)
* Unit count (word count, or character count for CKJ languages) (unit_count)
* Price (credits)

__Recommended__

* Job # (job_id)
* Timestamp when the job was last updated with a comment or status change
* Number of comments
* “Cancel” button (if the job or group of jobs has the status available or unpaid)

__If possible__

* Indicate when there are unread comments
* Show the estimated completion time (eta)

<figure>
    <img src="/images/ui_recommendations/translation-overview.png">
    <figcaption>
        <p>
            <!-- todo: updated timestamp needs fixing once I know how it’s determined -->
            Translation overview wireframe showing all recommended functionality (with a guide below)
        </p>
        <p>
            Normal method: <a href="/v2/jobs/get"><code>translate/jobs (GET)</code></a>
        </p>
    </figcaption>
</figure>

### Pending job panel

Depending on your app, you may choose to show pending translations (a status of available, pending, or unpaid) simply as normal data within your system, or you may wish to show them on their own specific page. If you do choose to have a discrete page, we recommend you also show the comment thread panel on this page.

__Required__

Allow the user to cancel an available or unpaid translation (pending jobs can not be cancelled)

__Recommended__

Show the submitted text (body_src)
Show the estimated completion time (eta)

__If possible__

Show a machine translation (body_tgt)

<figure>
    <img src="/images/ui_recommendations/pending-translation.png">
    <figcaption>
    <p>
        A basic pending job panel wireframe underneath the job’s overview information
    </p>
    <p>
        Normal method: <a href="/v2/jobs/get"><code>translate/job/{id} (GET)</code></a>
    </p>
    </figcaption>
</figure>

### Comment thread panel

The comment thread panel displays comments from the user, translator(s) and Gengo support regarding a job or group of jobs.

__Required__

Show comments, including the following info per-comment:

* Comment (body)
* Author (author)
* Timestamp (ctime)

__Recommended__

* Display comments from Gengo customer support differently
* Show or link to previous revisions in the comment thread

<figure>
    <img src="/images/ui_recommendations/comment-thread.png">
    <figcaption>
        <p>
            A simple comment thread wireframe
        </p>
        <p>
            Normal method: <a href="/v2/comments/get-job-id"><code>translate/job/{id}/comments (GET)</code></a>
        </p>
    </figcaption>
</figure>

### Comment submission panel

If a comment submission form is not provided in your app, we recommend including a link to the job’s details page on Gengo, using the URL http://gengo.com/translate/job/details/{id}.

__Required__

* Comment field (body)
* “Submit” button
* Warn users not to submit or request personal details
* Prevent empty comment

<figure>
    <img src="/images/ui_recommendations/comment.png">
    <figcaption>
        <p>
            A comment submission panel wireframe
        </p>
        <p>
            Normal method: <a href="/v2/comment/post-job-id"><code>translate/job/{id}/comment (POST)</code></a>
        </p>
    </figcaption>
</figure>

### Feedback panel

The feedback panel allows users to formally rate and comment on the translation (job or group of jobs) when they approve it. This is very valuable feedback that helps us improve Gengo’s service. You can also allow the user to add the translator to their preferred translators list. Currently the feedback form needs to be included within the job review form, as feedback is sent within the approve call using translate/job/{id} (PUT) approve.

__Recommended__

* Rating (rating, single choice)
    * Include the rating guideline matrix — 1 (poor) to 5 (fantastic)
* Feedback for translator (for_translator)
* Feedback for Gengo staff (for_mygengo, private)
* Allow the user to choose whether Gengo may use the translation as a public example (public)

__If possible__

* Allow the user to add the translator to their preferred translators list

<figure>
    <img src="/images/ui_recommendations/translation-review-detailed.png">
    <figcaption>
        <p>
            A wireframe of a recommended feedback panel as part of the translation job review panel, for a group of jobs
        </p>
        <p>
            Normal method: part of <a href="/v2/jobs/put-job-id"><code>translate/job/{id} (PUT) approve</code></a>
        </p>
    </figcaption>
</figure>

### Approved job panel

Depending on your app, you may choose to show approved jobs simply as normal data within your system, or you may wish to show them in their own specific panel.

__Required__

* The translated text (body_tgt)

__Recommended__

* The original text (body_src)
* Any feedback submitted (rating, for_translator, for_mygengo)

__If possible__

* Comment thread (via translate/job/{id}/comments (GET))
* Show or link to previous revisions in the comment thread (via translate/job/{id}/revisions (GET))

<figure>
        <img src="/images/ui_recommendations/approved-translation.png">
        <figcaption>
            <p>
                An approved job panel wireframe, including optional submitted feedback
            </p>
            <p>
                Normal method: <a href='/v2/jobs/get-job-id'><code>translate/job/{id} (GET)</code></a>
            </p>
        </figcaption>
</figure>

### Request revisions panel

The request revisions panel allows the user to request revisions from the job’s translator. If an in-app form is not provided, we recommend including a link to the job details page on Gengo, using the URL http://gengo.com/translate/job/details/{id}.

__Required__

* Comment field to let the translator know the reason(s) for requesting revisions, in as much detail as possible (comment)
* “Request revisions” button

__Recommended__

* Include Gengo’s revisions instructions
* Include link to the Gengo FAQ (see “<a href='http://gengo.com/contact-support/faqs/'>When should I reject a job? When should I request corrections?</a>”)
* Remind the user to write the comment in the source language or target language

<figure>
    <img src="/images/ui_recommendations/request-revisions.png">
    <figcaption>
        <p>
            A request revisions panel wireframe
        </p>
        <p>
            Normal method: <a href='/v2/job/put-job-id'><code>translate/job/{id} (PUT) revise</code></a>
        </p>
    </figcaption>
</figure>

### Job rejection panel

The job rejection panel allows the user to reject a specific job, and requires that the user answer a simple captcha to verify the rejection. If an in-app form is not provided, we recommend including a link to the job details page on Gengo, using the URL http://gengo.com/translate/job/details/{id}.

__Required__

* Reason for rejection (from presets “quality”, “incomplete”, “other”) (reason)
* Comment field to explain the reason for rejection (comment)
* Captcha image
* Captcha text field (captcha)
* “Reject” button (by default this will pass the job to another translator, follow_up = "requeue")

__Recommended__

* Ask user if they would like to use the request revisions instead
* Include Gengo’s rejection instructions
* Include link to the Gengo FAQ (see “<a href='http://gengo.com/contact-support/faqs/'>When should I reject a job? When should I request corrections?</a>”)
Change “Reject” button to “Reject and reopen”, and add a “Reject and close” button (follow_up = "cancel")

<figure>
    <img src="/images/ui_recommendations/job-rejection.png">
    <figcaption>
        <p>
            A job rejection panel wireframe
        </p>
        <p>
            Normal method: <a href='/v2/job/put-job-id'><code>translate/job/{id} (PUT) reject</code></a>
        </p>
    </figcaption>
</figure>

### Settings panel

The settings panel allows the user to set their public and private API keys, and define default settings for job orders. You may also place other settings information in this page that is specific to how your app works with the Gengo API. For instance you may allow the user to set the default translation tier for new jobs. The user might not change these settings themselves — they may be set centrally or through a configuration file.

__Required__

* Update API public key
* Update API private key

__Potential options__

* Use preferred translators by default
* Approve all jobs automatically
* Set a custom email notification address

<figure>
    <img src="/images/ui_recommendations/settings.png">
    <figcaption>
    <!-- todo: normal method for this? -->
    A simple settings panel wireframe</figcaption>
</figure>

<figure>
    <img src="/images/ui_recommendations/account.png" alt="13 Account">
    <figcaption>
        <p>
            <!-- todo check: this isn’t mentioned in the settings panel description, & not sure what happens (send user to Gengo?) -->
            A remaining credits panel wireframe, allowing the user to top up their credits
        </p>
        <p>
            Normal method: <a href='/v2/account/balance'><code>account/balance (GET)</code></a>
        </p>
    </figcaption>
</figure>
