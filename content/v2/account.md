---
title: Account | Gengo API
---

# Account methods

This describes the endpoints that deal with Account information on Gengo API.

* [Stats __(GET)__](#stats-get)
* [Balance __(GET)__](#balance-get)
* [Preferred translators __(GET)__](#preferred-translators-get)

## Stats (GET)

__Summary__
: Retrieves account stats, such as orders made.

__URL__
: http://api.gengo.com/v2/account/stats

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

    # Print the account stats...
    print gengo.getAccountStats()


__Response__

<%= headers 200 %>
<%= json :account_stats %>

## Balance (GET)

__Summary__
: Retrieves account balance in credits.

__URL__
: http://api.gengo.com/v2/account/balance

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

    # Retrieve and print the account balance and currency. Properties ahoy!
    print gengo.getAccountBalance()

__Response__

<%= headers 200 %>
<%= json :account_balance %>

## Preferred translators (GET)

__Summary__
: Retrieves preferred translators set by user.

__URL__
: http://api.gengo.com/v2/account/preferred\_translators

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

    # Retrieve and print an array of your preferred translators by language pair
    print gengo.getPreferredTranslators()

__Response__

<%= headers 200 %>
<%= json :account_preferred_translators %>
