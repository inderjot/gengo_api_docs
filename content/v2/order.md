---
title: Order | Gengo API
---

# Order methods

This describes the endpoints that deal with Order on the Gengo API.

* [Order __(GET)__](#order-get)
* [Order __(DELETE)__](#order-delete)

## Order (GET)

__Summary__
: Retrieves a group of jobs that were previously submitted together by their order id.

__URL__
: http://api.gengo.com/v2/translate/order/{order_id}

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Example call__

    #!ruby
    #!/usr/bin/env ruby

    require 'mygengo'

    @mygengo_client = MyGengo::API.new({
        :public_key => 'pub_key',
        :private_key => 'priv_key',
        :sandbox => false,
    })

    puts @mygengo_client.getTranslationOrderJobs({
        :order_id => 559516
    })


__Response__

<%= headers 200 %>
<%= json :order_get %>

## Order (DELETE)

__Summary__
: Cancels all available jobs in an order. Please keep in mind, you can only cancel a job if it has not been started already by a translator. This also cancels the order itself.

__URL__
: http://api.gengo.com/v2/translate/order/{id}

__Authentication__
: Required

__Parameters__
: * api_key(required) Your API key.
  * api_sig(required) Your API signature.
  * ts(required) Current Unix epoch time as an integer.

__Example call__

    #!python
    # -*- coding: utf-8 -*-
    #!/usr/bin/python
    from gengo import Gengo

    # Get an instance of Gengo to work with...
    gengo = Gengo(
        public_key='your_public_key',
        private_key='your_private_key',
        sandbox=True, # possibly false, depending on your dev needs )

    # Sends the command to delete all jobs in an order.
    gengo.deleteTranslationOrder(id=42)

__Response__

<%= headers 200 %>
<%= json :ok_empty_response %>