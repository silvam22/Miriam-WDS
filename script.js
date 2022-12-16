// render all elements html
$(function () {
  var currentDay = $("#currentDay");
  var timeBlock = $(".time-block");
  var saveButton = $(".saveBtn");
  var textArea = $("textarea");
  var date = dayjs();
  var currentHour = date.format("H");

  // function to get the current date and show up in the header
  function operateCurrentDate() {
    var dateDisplay;
    if (
      date.format("D") == 1 || date.format("D") == 21 || date.format("D") == 31)
    {
      dateDisplay = date.format("dddd, MMMM D[st]");
    } else if (date.format("D") == 2 || date.format("D") == 22) {
      dateDisplay = date.format("dddd, MMMM D[nd]");
    } else if (date.format("D") == 3 || date.format("D") == 23) {
      dateDisplay = date.format("dddd, MMMM D[rd]");
    } else {
      dateDisplay = date.format("dddd, MMMM D[th]");
    }
    currentDay.text(dateDisplay);
  }

  // function of changing the color of time-blocks based on current hour
  function differentColorForTimeBlock() {
    for (var i = 0; i < timeBlock.length; i++) {
      var timeBlockHour = $(timeBlock[i]).attr("id").split("-")[1];
      if (parseInt(currentHour) > parseInt(timeBlockHour)) {
        $(timeBlock[i]).addClass("past");
      } else if (parseInt(currentHour) == parseInt(timeBlockHour)) {
        $(timeBlock[i]).addClass("present");
      } else {
        $(timeBlock[i]).addClass("future");
      }
    }
  }

  // function to save contents when clicking save icon
  saveButton.each(function () { 
    $(this).on("click", function () { 
      var key = $(this).parent().attr("id");
      var text = $(this).siblings("textarea").val();
      localStorage.setItem(key, text);
    })
  })

  // function to load contents to the time block from local storage
  function getValueFromLocalStorage() { 
    for (var i = 0; i < timeBlock.length; i++) {
      var text = localStorage.getItem($(timeBlock[i]).attr("id"));
      $(timeBlock[i]).children().eq(1).val(text); 
    }
  }
// calling functions
  operateCurrentDate();
  differentColorForTimeBlock();
  getValueFromLocalStorage();

  });