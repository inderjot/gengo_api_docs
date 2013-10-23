---
title: Jobs | Gengo API
---

# Jobs methods

This describes the endpoints that deal with Jobs on the Gengo API.

* [Jobs __(POST)__](#jobs-post)
* [Jobs __(GET)__](#jobs-get)
* [Jobs by {id} __(GET)__](#jobs-by-id-get)


## Jobs (POST)

__Summary__
: Submits a job or group of jobs to translate.

__URL__
: http://api.gengo.com/v2/translate/jobs

__Authentication__
: Required

__Parameters___
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Data arguments__
: * jobs(required): An array of Job Payloads. Please see the job payloads page for full details of the required parameters.
  * as_group(optional): 1 (true) / 0 (false, default). Whether all jobs in this group should be done by one translator. Some restrictions apply to what jobs can be grouped, including the requirement that language pairs and tiers must be the same across all jobs.
  * allow_fork(optional): 1 (true, default) / 0 (false). If a grouped job is partially completed by a translator, but a translator fails to complete the whole thing, a new order is normally created for the remaining unfinished jobs (it forks) so another translator can take it. If as_group is true and allow_fork is false, then the remaining jobs will instead be cancelled.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-
    from gengo import Gengo

    # Get an instance of Gengo to work with...

    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=True,) # possibly false, depending on your dev needs

    # This is an exhaustive view of this object; chances are your code will never
    # have to be this verbose because you'd want to build it up programmatically.
    data = {
        'jobs': {
            'job_1': {
                'type': 'text', # REQUIRED. Type to translate, you'll probably always put 'text' here.
                'slug': 'Single :: English to Japanese', # REQUIRED. Title of job. For internally storing, can be generic.
                'body_src': 'Testing Gengo API library calls.', # REQUIRED. The text you're translating.
                'lc_src': 'en', # REQUIRED. source_language_code (see getServiceLanguages() for a list of codes)
                'lc_tgt': 'ja', # REQUIRED. target_language_code (see getServiceLanguages() for a list of codes)
                'tier': 'standard', # REQUIRED. tier type ("machine", "standard", "pro", or "ultra")
                'auto_approve': 0, # OPTIONAL. Hopefully self explanatory (1 = yes, 0 = no)
                'comment': 'HEY THERE TRANSLATOR', # OPTIONAL. Comment to leave for translator.
                'callback_url': 'http://...', # OPTIONAL. Callback URL that updates are sent to.
                'custom_data': 'your optional custom data, limited to 1kb.', # OPTIONAL
                'force':  0, # OPTIONAL. 0 (false - default) / 1 (true), whether or not to override lazy loading and force a new translation 
                'use_preferred': 0 # OPTIONAL. If account has preferred translators then set as 1 to use only them
            },
            'job_2': {
                'type': 'text', # REQUIRED. Type to translate, you'll probably always put 'text' here.
                'slug': 'Single :: English to Japanese', # REQUIRED. Title of job. For internally storing, can be generic.
                'body_src': 'Testing Gengo API library calls.', # REQUIRED. The text you're translating.
                'lc_src': 'en', # REQUIRED. source_language_code (see getServiceLanguages() for a list of codes)
                'lc_tgt': 'ja', # REQUIRED. target_language_code (see getServiceLanguages() for a list of codes)
                'tier': 'standard', # REQUIRED. tier type ("machine", "standard", "pro", or "ultra")
                'auto_approve': 0, # OPTIONAL. Hopefully self explanatory (1 = yes, 0 = no)
                'comment': 'HEY THERE TRANSLATOR', # OPTIONAL. Comment to leave for translator.
                'callback_url': 'http://...', # OPTIONAL. Callback URL that updates are sent to.
                'custom_data':'your optional custom data, limited to 1kb.', # OPTIONAL
                'force':  0, # OPTIONAL. 0 (false - default) / 1 (true), whether or not to override lazy loading and force a new translation 
                'use_preferred': 0 # OPTIONAL. If account has preferred translators then set as 1 to use only them
            },
            ...
        },
        'as_group': 1, # OPTIONAL. 1 (true) / 0 (false, default). Whether all jobs in this group should be done by one translator.
    }
    # And now we post them over...
    print gengo.postTranslationJobs(jobs=data)

__Response__

In all cases, the response from should be near instant. That said, there are 3 possible types of response payloads depending on the jobs that were submitted in the POST call.

_All jobs are new_

If there are only new jobs (see lazy loading), or all jobs have the force flag, the response will have a new order id, the number of jobs and the total cost of the order if the as\_group flag is set to true.

<%= headers 200 %>
<%= json :jobs_post_all_new %>

_All jobs are old_

If there are only 100% matching jobs (i.e. all jobs have already been ordered before and translations exist), the response is a list of the jobs, keyed the same as in the original submission. The status for these jobs will be updated as "approved". Notice that each index is a list, as there may be several matching jobs for a single payload if the force flag has been used in past POSTs. 

The translation is in the "body\_tgt" variable. The order id will be new and the credits\_used will be same amount, but not charged again because we have not orderd any new content.

<%= headers 200 %>
<%= json :jobs_post_all_old %>

_There are repeated jobs in the jobs payload_

If there are any jobs inside a payload that are repeats of any other jobs in the same payload, the response will return the same translated text of the previous jobs that were sent.

The job count will be the number of jobs sent, however the credits will only charge for one of the repeated jobs in the payload. A new order id is created for each request.

<%= headers 200 %>
<%= json :jobs_post_duplicates %>

_Mix of new and old jobs_

If there is a mix of previously ordered jobs (100% matching in content and language pair) and new jobs in the POST, you will get back a response that contains the old jobs, an order ID for the new jobs and total cost for the new jobs in the order.

Please Note that the number of job\_count will be the total number of jobs sent in your payload, not just the new ones.

<%= headers 200 %>
<%= json :jobs_post_mix %>

## Jobs (GET)

__Summary__
: Retrieves a list of resources for the most recent jobs filtered by the given parameters.

__URL__
: http://api.gengo.com/v2/translate/jobs

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Data arguments__
: * status(optional): "available", "pending", "reviewable", "approved", "rejected", or "canceled"
  * timestamp\_after(optional): Epoch timestamp from which to filter submitted jobs.
  * count(optional): Defaults to 10. Maximum 200.

__Note__

* If you only use count, you'll get the most recent count jobs.
* If you use count with timestamp\_after, you'll get count jobs submitted since timestamp\_after.
* If you only use timestamp\_after, you'll get all jobs submitted since timestamp\_after.

__Example call__

    #!python
    #!/usr/bin/python
    # -*- coding: utf-8 -*-
    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=True,) # possibly false, depending on your dev needs

    # Think of this as a "search my jobs" method, and it becomes very self-explanatory.
    print gengo.getTranslationJobs(status="pending", count=15)


__Response__

<%= headers 200 %> 
<%= json :jobs_get %>


## Jobs by id (GET)

__Summary__
: Retrieves a list of jobs. They are requested by a comma-separated list of job ids.

__URL__
: http://api.gengo.com/v2/translate/jobs/{ids}

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.
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
        sandbox=True,) # possibly false, depending on your dev needs

    # "id" means job_id
    # Note: no spaces after commas in "id"
    print gengo.getTranslationJobBatch(id="1,2")

__Response__

<%= headers 200 %>
<%= json :jobs_by_ids_get %>
