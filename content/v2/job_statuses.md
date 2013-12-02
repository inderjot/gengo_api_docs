---
title: Job statuses | Gengo API
---

# Job statuses

Each submitted job goes through a series of statuses before delivery.
At any time when you request the contents of a job, it will be in one of the following states:

`queued`
: The jobs are being processed by our system but are not currently visible to our translators.

`available`
: The jobs are now on our system and waiting for a translator to begin work.

`pending`
: A translator is now working on the content, but has not finished.

`reviewable`
: Unless the parameter "auto-approve" is set to 1,
  this is the status that indicates the translation has been finished by our team. 

`approved`
: The job has been approved by the customer and the translator has been paid for their work
  (if "auto-approve" is set to 1, this happens as soon the content is submitted by the translator)

`revising`
: The customer has requested that some changes are made to the translation.

`rejected`
: The customer has rejected the completed job and our support team has been triggered to follow up on the job.

`canceled`
: The job has been cancelled before the translator has started working on the content.

When a job is in the "reviewable" status,
you may send a request to the PUT /translate/job/ endpoint,
which will move the job into "approved", "revising" or "rejected".
If no PUT request is made within 72hrs,
we automatically move the status to "approved".

The completed translation is available in the "reviewable" and "approved" status.
