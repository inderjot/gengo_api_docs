---
title: Glossary | Gengo API
---

# Glossary methods

This describes the endpoints that deal with Glossaries on the Gengo API.

* [Glossaries __(GET)__](#glossaries-get)
* [Glossary __(GET)__](#glossary-get)


## Glossaries (GET)

__Summary__
: Retrieves a list of glossaries that belongs to the authenticated user

__URL__
: http://api.gengo.com/v2/translate/glossary

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
        debug=False)

    print gengo.getGlossaryList()


__Response__

<%= headers 200 %>
<%= json :glossary_list_get %>


## Glossary (GET)

__Summary__
: Retreives a glossary by Id

__URL__
: http://api.gengo.com/v2/translate/glossary/{glossary\_id}

__Authentication__
: Required

__Parameters__
: * api\_key(required) Your API key
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
        debug=False)

    print gengo.getGlossary(id="115")

__Response__

<%= headers 200 %>
<%= json :glossary_get %>
