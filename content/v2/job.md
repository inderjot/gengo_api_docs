---
title: Job | Gengo API
---

# Job methods

This describes the endpoints that deal with singular Job tasks and information on Gengo API.

* [Job __(GET)__](#job-get)
* [Job __(PUT)__](#job-put)
* [Job __(DELETE)__](#job-delete)
* [Revisions __(GET)__](#revisions-get)
* [Revision __(GET)__](#revision-get)
* [Feedback __(GET)__](#feedback-get)
* [Comment __(POST)__](#comment-post)
* [Comments __(GET)__](#comments-get)


## Job (GET)

__Summary__
: Retrieves a specific job.

__URL__
: http://api.gengo.com/v2/translate/job/{id}

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.
  * pre\_mt(optional) 1 (true) / 0 (false, default).
    Whether to return a machine translation if the human translation is not complete yet.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Get the job in question; pre_mt set to 1 will give you a machine translation
    # if the human translation isn't available yet. ;)
    gengo.getTranslationJob(id=42, pre_mt=1)


__Response__

<%= headers 200 %>
<%= json :JOB_GET %>


## Job (PUT)

__Summary__
: Updates a job to translate.

__URL__
: http://api.gengo.com/v2/translate/job/{id}

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Data arguments__
: * action(required):
      * "revise" - Returns this job back to the translator for revisions.
        Other parameters:
          * comment (required) - The reason to the translator for sending the job back for revisions.
      * "approve" - Approves job. 
        Other parameters:
          * rating (optional) 1 (poor) to 5 (fantastic)
          * for_translator (optional) Comments for the translator
          * for_mygengo (optional) Comments for Gengo staff (private)
          * public (optional) 1 (true) / 0 (false, default). Whether Gengo can share this feedback publicly
      * "reject" - Rejects the translation. Please see our FAQs for details of the rejection process.
        Other parameters:
          * reason (required) "quality", "incomplete", "other"
          * comment (required)
          * captcha (required) The captcha image text.
            Each job in a "reviewable" state will have a captcha_url value, which is a URL to an image.
            This captcha value is required only if a job is to be rejected.
            If the captcha is wrong, a URL for a new captcha is also included with the error message.
          * follow_up (optional) "requeue" (default) or "cancel".
            If you choose "requeue" the job will be rejected and then passed onto another translator.
            If you choose "cancel" the job will be completely cancelled upon rejection.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Update a job that has an id of 42, and reject it, cite the reason,
    # add a comment, and throw up some captcha stuff. See the docs for
    # more information pertaining to this method, it can do quite a bit. :)

    gengo.updateTranslationJob(
        id=42,
        action={
            'action': 'reject',
            'reason': 'quality',
            'comment': 'My grandmother does better.',
            'captcha': 'BERT' # captcha image text
        }
    )

__Response__

<%= headers 200 %>
<%= json :ok_empty_response %>


## Job (DELETE)

__Summary__
: Cancels the job. You can only cancel a job if it has not been started already by a translator.

__URL__
: http://api.gengo.com/v2/translate/job/{id}

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Sets a job to cancelled if it is currently in available status
    gengo.deleteTranslationJob(id=42)

__Response__

<%= headers 200 %>
<%= json :ok_empty_response %>


## Revisions (GET)

__Summary__
: Gets list of revision resources for a job.
  Revisions are created each time a translator or Senior Translator updates the text.

__URL__
: http://api.gengo.com/v2/translate/job/{id}/revisions

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Get every revision on a job. Returns a data set, iterate if need be!
    print gengo.getTranslationJobRevisions(id=42)

__Response__

<%= headers 200 %>
<%= json :revisions_get %>


## Revision (GET)

__Summary__
: Gets a specific revision for a job.

__URL__
: http://api.gengo.com/v2/translate/job/{id}/revision/{rev\_id}

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Get specific revision
    print gengo.getTranslationJobRevision(id=42, rev_id=1)

__Response__

<%= headers 200 %>
<%= json :revision_get %>


## Feedback (GET)

Gets a specific revision for a job.

__Summary__
: Gets the feedback left for the translator for this job.

__URL__
: http://api.gengo.com/v2/translate/job/{id}/feedback

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Get feedback given on a job
    print gengo.getTranslationJobFeedback(id=42)

__Response__

<%= headers 200 %>
<%= json :feedback_get %>


## Comments (GET)

__Summary__
: Retrieves the comment thread for a job.

__URL__
: http://api.gengo.com/v2/translate/job/{id}/comments

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Note__
: Possible values for "author" are "customer" or "worker".

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Get all the comments on a specific job.
    # Note that this returns a data set, so while we just print it below,
    # you'll nevitably want to iterate over it and such.
    print gengo.getTranslationJobComments(id=42)

__Response__

<%= headers 200 %>
<%= json :COMMENTS_GET %>


## Comment (POST)

__Summary__
: Submits a new comment to the job's comment thread.

__URL__
: http://api.gengo.com/v2/translate/job/{id}/comment

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key.
  * api\_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Data arguments__
: * body(required): The comment body

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-

    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=False, # possibly false, depending on your dev needs
        debug=False)

    # Post a comment on a specific job
    # perhaps you have an update for the translator or something of the sort.
    gengo.postTranslationJobComment(
        id=42,
        comment={
            'body': 'I love lamp!'
        }
    )

__Response__

<%= headers 200 %>
<%= json :ok_empty_response %>
