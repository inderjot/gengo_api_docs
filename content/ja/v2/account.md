---
title: Account | Gengo API
---

# Account methods

This describes the endpoints that deal with Account information on Gengo API.

* [Stats __(GET)__](#stats-get)
* [Balance __(GET)__](#balance-get)

## Stats (GET)

__Summary__
: Retrieves account stats, such as orders made.

__URL__
: http://api.gengo.com/v2/account/stats

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.

__Example call__

    # -*- coding: utf-8 -*-
    #!/usr/bin/python

    from mygengo import MyGengo

    # Get an instance of MyGengo to work with...
    gengo = MyGengo(
        public_key = 'xpU@jqEzqnXCb#OOsAeR4z49IX|j}#dwyliMp2RIq1vM9OIKq-K#{mg~sVBUX^91',
        private_key = '~Q9hI|sV(I^iX7|8WQ=l5=CvUmEWx3[=c5ms09|$JIuT-$aiTIYkS4~1F7^C9dw3',
        sandbox = False, # possibly false, depending on your dev needs )

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

__Parameters___
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.

__Example call__

    # -*- coding: utf-8 -*-
    #!/usr/bin/python
    from mygengo import MyGengo

    # Get an instance of MyGengo to work with...
    gengo = MyGengo(
        public_key = 'xpU@jqEzqnXCb#OOsAeR4z49IX|j}#dwyliMp2RIq1vM9OIKq-K#{mg~sVBUX^91',
        private_key = '~Q9hI|sV(I^iX7|8WQ=l5=CvUmEWx3[=c5ms09|$JIuT-$aiTIYkS4~1F7^C9dw3',
        sandbox = False, # possibly false, depending on your dev needs
        debug = True )

    # Retrieve and print the account balance. Properties ahoy!
    print gengo.getAccountBalance()['response']['credits']

__Response__

<%= headers 200 %>
<%= json :account_balance %>