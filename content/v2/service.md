---
title: Service | Gengo API
---

# Service methods

This describes the endpoints that deal with Service on the Gengo API.

* [Language Pairs __(GET)__](#language-pairs-get)
* [Languages __(GET)__](#languages-get)
* [Quote __(POST)__](#quote-post)
* [Quote files __(POST)__](#quote-files-post)


## Language pairs (GET)

__Summary__
: Returns supported translation language pairs, tiers, and credit prices.

__URL__
: http://api.gengo.com/v2/translate/service/language_pairs

__Authentication__
: Not required

__Parameters__
: * api_key(required) Your API key.

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

    # Useful for figuring out what language paths are supported - e.g, if
    # we use 'en' below, we'll see what languages we can translate TO from 'en'.
    # The `lc_src` parameter can be omitted to fetch all language pairs.
    print gengo.getServiceLanguagePairs(lc_src='de')

__Response__

<%= headers 200 %>
<%= json :lang_pairs_get %>

## Languages (GET)

__Summary__
: Returns a list of supported languages and their language codes.

__URL__
: http://api.gengo.com/v2/translate/service/languages

__Authentication__
: Not required

__Parameters__
: * api_key(required) Your API key.

__Data arguments__
: * lc_src(optional): Source language code. Submitting this will filter the response to only relevant language pairs.

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

    # Get a list of every supported language, with their respective language codes.
    print gengo.getServiceLanguages()


__Response__

<%= headers 200 %>
<%= json :langs_get %>

## Quote (POST)

__Summary__
: Returns credit quote and unit count for text based on content, tier, and language pair for job or jobs submitted.

__URL__
: http://api.gengo.com/v2/translate/service/quote

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
: * api_sig(required) Your API signature.
: * ts(required) Current Unix epoch time as an integer.

__Data arguments__
: * jobs(required): An array of Job payloads, but only with the "lc_src", "lc_tgt", and "tier" parameters.

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

    jobs_data = {
            'job_1': {
                'type': 'text', # REQUIRED. Type to translate, you'll probably always put 'text' here.
                'slug': 'Single :: English to Japanese', # REQUIRED. Slug for internally storing, can be generic.
                'body_src': 'Testing Gengo API library calls.', # REQUIRED. The text you're translating.
                'lc_src': 'en', # REQUIRED. The code for the language you are translating *from*
                'lc_tgt': 'ja', # REQUIRED. The code for the language you are translating *into*
                'tier': 'standard', # REQUIRED. tier type ("machine", "standard", "pro", or "ultra")
                'auto_approve': 0, # OPTIONAL. Hopefully self explanatory (1 = yes, 0 = no)
                'comment': 'HEY THERE TRANSLATOR', # OPTIONAL. Comment to leave for translator.
                'callback_url': 'http://...', # OPTIONAL. Callback URL that updates are sent to.
                'custom_data': 'your optional custom data, limited to 1kb.' # OPTIONAL
            },
            'job_2': {
                'type': 'text', # REQUIRED. Type to translate, you'll probably always put 'text' here.
                'slug': 'Single :: English to Japanese', # REQUIRED. Slug for internally storing, can be generic.
                'body_src': 'Testing Gengo API library calls.', # REQUIRED. The text you're translating.
                'lc_src': 'en', # REQUIRED. The code for the language you are translating *from*
                'lc_tgt': 'ja', # REQUIRED. The code for the language you are translating *into*
                'tier': 'standard', # REQUIRED. tier type ("machine", "standard", "pro", or "ultra")
                'auto_approve': 0, # OPTIONAL. Hopefully self explanatory (1 = yes, 0 = no)
                'comment': 'HEY THERE TRANSLATOR', # OPTIONAL. Comment to leave for translator.
                'callback_url': 'http://...', # OPTIONAL. Callback URL that updates are sent to.
                'custom_data':'your optional custom data, limited to 1kb.' # OPTIONAL
            },
            ...
    }

    # Post over our two jobs, use the same translator for both, don't pay for them
    print gengo.determineTranslationCost(jobs=jobs_data)

__Response__

<%= headers 200 %>
<%= json :quote_post %>

## Quote files (POST)

__Summary__
: Uploads files to Gengo and returns a quote for each file, with an identifier for when client is ready to place the actual order. Price quote is based on content, tier, and language pair. After using this call, use the returned identifier as a parameter in the jobs POST method to order the actual job (see Job Payloads).

  __Note:__ When uploading files, there is a limit of 50 files per call

__URL__
: http://api.gengo.com/v2/translate/service/quote/file

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
: * api_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Data arguments__
: * jobs(required): An array of Job payloads, but only with the "lc_src", "lc_tgt", and "tier" parameters.
  * files(required): A dictionary of files, where for each key, there is a multipart-encoded file

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

    jobs_data = {
        'job_1': {
            'type': 'file', # REQUIRED. Type to translate, you'll probably always put 'text' here.
            'lc_src': 'en', # REQUIRED. The code for the language you are translating *from*
            'lc_tgt': 'ja', # REQUIRED. The code for the language you are translating *into*
            'tier': 'standard', # REQUIRED. tier type ("standard" or "pro")
            'file_path': '/job_1/file_path.doc', # REQUIRED.
        },
        'job_2': {
            'type': 'file', # REQUIRED. Type to translate, you'll probably always put 'text' here.
            'lc_src': 'en', # REQUIRED. The code for the language you are translating *from*
            'lc_tgt': 'ja', # REQUIRED. The code for the language you are translating *into*
            'tier': 'standard', # REQUIRED. tier type ("standard" or "pro")
            'file_path': '/job_2/file_path.pdf', # REQUIRED.
        },
        'job_3': {
            'type': 'file', # REQUIRED. Type to translate, you'll probably always put 'text' here.
            'lc_src': 'en', # REQUIRED. The code for the language you are translating *from*
            'lc_tgt': 'ja', # REQUIRED. The code for the language you are translating *into*
            'tier': 'standard', # REQUIRED. tier type ("standard" or "pro")
            'file_path': '/job_3/file_path.foo', # REQUIRED.
        },
    }

    # Post over our two jobs, use the same translator for both, don't pay for them
    print gengo.determineTranslationCost(jobs=jobs_data)

__Response__

<%= headers 200 %>
<%= json :quote_files_post %>
