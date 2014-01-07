---
title: API Methods | Gengo API
---

# API Methods

[account/stats __(GET)__](/v2/api_methods/account/#stats-get)
: Retrieves account stats, such as orders made.

[account/balance __(GET)__](/v2/api_methods/account/#balance-get)
: Retrieves account balance in credits.

[account/preferred_translators __(GET)__](/v2/api_methods/account/#preferred_translators-get)
: Retrieves preferred translators set by user.

[translate/job/{id} __(GET)__](/v2/api_methods/job/#job-get)
: Retrieves a specific job.

[translate/job/{id} __(PUT)__](/v2/api_methods/job/#job-put)
: Updates a job to translate.

[translate/job/{id} __(DELETE)__](/v2/api_methods/job/#comment_post)
: Cancels the job. You can only cancel a job if it has not been started already by a translator.

[translate/job/{id}/revision/{rev_id} __(GET)__](/v2/api_methods/job/#revision-get)
: Gets a specific revision for a job.

[translate/job/{id}/revisions __(GET)__](/v2/api_methods/job/#revisions-get)
: Gets list of revision resources for a job. Revisions are created each time a translator or Senior Translator updates the text.

[translate/job/{id}/feedback __(GET)__](/v2/api_methods/job/#feedback-get)
: Retrieves the feedback you have submitted for a particular job.

[translate/job/{id}/comment __(POST)__](/v2/api_methods/job/#comment_post)
: Submits a new comment to the job's comment thread.

[translate/job/{id}/comments __(GET)__](/v2/api_methods/job/#comments-get)
: Retrieves the comment thread for a job.

[translate/jobs __(GET)__](/v2/api_methods/jobs/#jobs-get)
: Retrieves a list of resources for the most recent jobs filtered by the given parameters.

[translate/jobs/{ids} __(GET)__](/v2/api_methods/jobs/#jobs-get-by-ids)
: Retrieves a list of jobs. They are requested by a comma-separated list of job ids.

[translate/jobs __(POST)__](/v2/api_methods/jobs/#jobs-post)
: Submits a job or group of jobs to translate.

[translate/order __(GET)__](/v2/api_methods/order/#order-get)
: Retrieves a specific order containing all jobs.

[translate/order __(DELETE)__](/v2/api_methods/order/#order-delete)
: Deletes all available jobs in an order.

[translate/glossary __(GET)__](/v2/api_methods/glossary/#glossaries-get)
: Retrieves a list of glossaries that belongs to the authenticated user

[translate/glossary/{id} __(GET)__](/v2/api_methods/glossary/#glossary-get)
: Retreives a glossary by Id

[translate/service/language_pairs __(GET)__](/v2/api_methods/service/#language_pairs-get)
: Returns supported translation language pairs, tiers, and credit prices.

[translate/service/languages __(GET)__](/v2/api_methods/service/#language-get)
: Returns a list of supported languages and their language codes.

[translate/service/quote __(POST)__](/v2/api_methods/service/#quote-post)
: Returns credit quote and unit count for text based on content, tier, and language pair for job or jobs submitted.

[translate/service/quote/file __(POST)__](/v2/api_methods/service/#quote-files-post)
: Uploads files to Gengo and returns a quote for each file, with an identifier for when client is ready to place the actual order. Price quote is based on content, tier, and language pair.
