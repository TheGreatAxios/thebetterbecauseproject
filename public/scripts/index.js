(function($){

  $.fn.simplyCountable = function(options){
    
    options = $.extend({
      counter:            '#counter',
      countType:          'characters',
      maxCount:           140,
      strictMax:          false,
      countDirection:     'down',
      safeClass:          'safe',
      overClass:          'over',
      thousandSeparator:  ',',
      onOverCount:        function(){},
      onSafeCount:        function(){},
      onMaxCount:         function(){}
    }, options);

    var navKeys = [33,34,35,36,37,38,39,40];

    return $(this).each(function(){

      var countable = $(this);
      var counter = $(options.counter);
      if (!counter.length) { return false; }
      
      var countCheck = function(){
             
        var count;
        var revCount;
        
        var reverseCount = function(ct){
          return ct - (ct*2) + options.maxCount;
        }
        
        var countInt = function(){
          return (options.countDirection === 'up') ? revCount : count;
        }
        
        var numberFormat = function(ct){
          var prefix = '';
          if (options.thousandSeparator){
            ct = ct.toString();          
            // Handle large negative numbers
            if (ct.match(/^-/)) { 
              ct = ct.substr(1);
              prefix = '-';
            }
            for (var i = ct.length-3; i > 0; i -= 3){
              ct = ct.substr(0,i) + options.thousandSeparator + ct.substr(i);
            }
          }
          return prefix + ct;
        }

        var changeCountableValue = function(val){
          countable.val(val).trigger('change');
        }
        
        /* Calculates count for either words or characters */
        if (options.countType === 'words'){
          count = options.maxCount - $.trim(countable.val()).split(/\s+/).length;
          if (countable.val() === ''){ count += 1; }
        }
        else { count = options.maxCount - countable.val().length; }
        revCount = reverseCount(count);
        
        /* If strictMax set restrict further characters */
        if (options.strictMax && count <= 0){
          var content = countable.val();
          if (count < 0) {
            options.onMaxCount(countInt(), countable, counter);
          }
          if (options.countType === 'words'){
            var allowedText = content.match( new RegExp('\\s?(\\S+\\s+){'+ options.maxCount +'}') );
            if (allowedText) {
              changeCountableValue(allowedText[0]);
            }
          }
          else { changeCountableValue(content.substring(0, options.maxCount)); }
          count = 0, revCount = options.maxCount;
        }
        
        counter.text(numberFormat(countInt()));
        
        /* Set CSS class rules and API callbacks */
        if (!counter.hasClass(options.safeClass) && !counter.hasClass(options.overClass)){
          if (count < 0){ counter.addClass(options.overClass); }
          else { counter.addClass(options.safeClass); }
        }
        else if (count < 0 && counter.hasClass(options.safeClass)){
          counter.removeClass(options.safeClass).addClass(options.overClass);
          options.onOverCount(countInt(), countable, counter);
        }
        else if (count >= 0 && counter.hasClass(options.overClass)){
          counter.removeClass(options.overClass).addClass(options.safeClass);
          options.onSafeCount(countInt(), countable, counter);
        }
        
      };
      
      countCheck();

      countable.on('keyup blur paste', function(e) {
        switch(e.type) {
          case 'keyup':
            // Skip navigational key presses
            if ($.inArray(e.which, navKeys) < 0) { countCheck(); }
            break;
          case 'paste':
            // Wait a few miliseconds if a paste event
            setTimeout(countCheck, (e.type === 'paste' ? 5 : 0));
            break;
          default:
            countCheck();
            break;
        }
      });

    });
    
  };

})(jQuery);


$(document).ready(function() {
  // Text area piece
  $('#story').simplyCountable({
    counter: '#counter',
    countType: 'words',
    countDirection: 'up'
  });
});

//Image Section Upload
let imgSectionOneButtonUpload = document.getElementById('imgSectionOneButtonUpload');
let imgSectionTwoUserUpload = document.getElementById('imgSectionTwoUserUpload');

// image Section Default
let imgSectionOneButtonDefault = document.getElementById('imgSectionOneButtonDefault');
let imgSectionTwoDefaultImage = document.getElementById('imgSectionTwoDefaultImage');

// Final Choice Buttons
let imageUploadButton = document.getElementById('imageUpload');
let imageDefaultButton = document.getElementById('imageDefault');

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Dom Fully Loaded and Parsed");
  imgSectionTwoUserUpload.style.visibility = 'hidden';
  imgSectionTwoDefaultImage.style.visibility = 'hidden';

  // Button Upload
  imgSectionOneButtonUpload.onclick = ((e) => {
    e.preventDefault();
    imgSectionTwoUserUpload.style.visibility = 'visible';
    imgSectionTwoUserUpload.style.height = 'auto';
    imgSectionTwoDefaultImage.style.visibility = 'hidden';
    imgSectionTwoDefaultImage.style.height = '0px';
    imgSectionTwoDefaultImage.style.display = 'none';
  });
  // Button Default
  imgSectionOneButtonDefault.onclick = ((e) => {
    e.preventDefault();
    imgSectionTwoDefaultImage.style.visibility = 'hidden';
    imgSectionTwoDefaultImage.style.height = '0px';
    imgSectionTwoUserUpload.style.visibility = 'hidden';
    imgSectionTwoUserUpload.style.height = '0px';
    imgSectionTwoDefaultImage.focus();
  });
  /*
  // Form Submit
  document.getElementById('storyForm').onsubmit = (() => {
    let nameEl = document.getElementById('name').value;
    let emailEl = document.getElementById('email').value;
    let storyEl = document.getElementById('story').value;
    let releaseEl = document.getElementById('releaseAgreement').value;

    let submit = true;
    // Check Name Input for being empty
    if (nameEl == null || nameEl == "") {

    }
    // Check Email Input for being empty
    if (emailEl == null || emailEl == "") {

    }
    // Check Story Input for being empty
    if (storyEl == null || storyEl == "") {

    }
    // Check if checked
    if (releaseEl == null || releaseEl == false) {

    }
  });
  */
});


