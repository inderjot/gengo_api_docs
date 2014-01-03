// Init sidebar
$(function() {
  var activeItem,
      helpList = $('#js-sidebar .js-topic'),
      firstOccurance = true


	alert(window.location.toString());

  // hide list items at startup
  if($('body.api') && window.location){
    var reg = /\/\/[^\/]+(\/.+)/g,
        docUrl = reg.exec(window.location.toString())
    if(docUrl){
      $('#tos-stacked-tabs .js-topic a').each(function(){
        var url = $(this).attr('href').toString();
        if(url.indexOf(docUrl[1]) >= 0 && url.length == docUrl[1].length){
	
          $(this).parent('li').addClass('disable')
          var parentTopic = $(this).parentsUntil('div.sidebar-module > ul').last()
          parentTopic.addClass('js-current')
          parentTopic.find('.js-expand-btn').toggleClass('collapsed expanded')
        }
      })
    }
  }

  $('#tos-stacked-tabs .js-topic').each(function(){
    if(($(this).find('.disable').length == 0 || firstOccurance == false) &&
    $(this).hasClass('js-current') != true){
      $(this).find('.js-guides').children().hide()
    } else {
      activeItem = $(this).index()
      firstOccurance = false
    }
  })

  // Toggle style list. Expanded items stay
  // expanded when new items are clicked.
  $('#tos-stacked-tabs .js-toggle-list .js-expand-btn').click(function(){
    var clickedTopic = $(this).parents('.js-topic'),
        topicGuides  = clickedTopic.find('.js-guides li')
    $(this).toggleClass('collapsed expanded')
    topicGuides.toggle(100)
    return false
  })

  // Accordion style list. Expanded items
  // collapse when new items are clicked.
  $('#tos-stacked-tabs .js-accordion-list .js-topic h3 a').click(function(){
    var clickedTopic = $(this).parents('.js-topic'),
        topicGuides = clickedTopic.find('.js-guides li')

    if(activeItem != clickedTopic.index()){
      if(helpList.eq(activeItem)){
        helpList.eq(activeItem).find('.js-guides li').toggle(100)
      }
      activeItem = clickedTopic.index()
      topicGuides.toggle(100)
    } else {
      activeItem = undefined
      topicGuides.toggle(100)
    }

    return false
  })

  $('.help-search .search-box').focus(function(){
    $(this).css('background-position','0px -25px')
  })

  $('.help-search .search-box').focusout(function(){
    if($(this).val() == ''){
      $(this).css('background-position','0px 0px')
    }
  });

});