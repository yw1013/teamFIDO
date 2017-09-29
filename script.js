function downloadCSV(args) {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.downloadCSV(args);
}

function lockShapes() {
	processingInstance = Processing.getInstanceById('mainCanvas');
	processingInstance.lockShapes();
}

function unlockShapes() {
	processingInstance = Processing.getInstanceById('mainCanvas');
	processingInstance.unlockShapes();
}

function setTargetSequence() {
	processingInstance = Processing.getInstanceById('mainCanvas');
	processingInstance.setTargetSequence();

	var done_button = document.getElementById('sequence-set-end');
	done_button.style.display = 'inline';

	var start_button = document.getElementById('sequence-set-start');
	start_button.style.display = 'none';
}

function endSetTargetSequence() {
	processingInstance = Processing.getInstanceById('mainCanvas');
	processingInstance.endSetTargetSequence();

	var done_button = document.getElementById('sequence-set-end');
	done_button.style.display = 'none';

	var start_button = document.getElementById('sequence-set-start');
	start_button.style.display = 'inline';
}

function logShapes() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.logShapes();
}

function createShape() {
	processingInstance = Processing.getInstanceById('mainCanvas');
	var color = $('#cp11').colorpicker('getValue');
    var xCoord = $("#Xcoordinate").val();
    var yCoord = $("#Ycoordinate").val();
	var rgb = hexToRgb(color);
	var created = processingInstance.createNewShape($("#newshapetype").val(), $("#newshapesize").val(), rgb, xCoord, yCoord);
	if (created) {
		$('#myModal').modal('toggle');
	}
}

/*function selectContactType() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    var contactType = $("#contactdropdown").val();
    processingInstance.contactSelection($("#contactdropdown").val());
}*/

function loadContactType() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.contactSelection($('#contactdropdown').val());
}

function createGrid() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    var color = $('#gridcolorpick').colorpicker('getValue');
    var numRows = $("#numRows").val();
    var numColumns = $("#numColumns").val();
    var rgb = hexToRgb(color);
    var populate = $('#populate').is(':checked');
    var created = processingInstance.createNewGrid(rgb, numRows, numColumns, populate);
    if (created) {
        $('#secondModal').modal('toggle');
    }
}

function saveCurrentLevel() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.saveCurrentLevel();
}

function makeNewLevel() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    var newlevelnum = processingInstance.makeNewLevel();
    $('#leveldropdown').append($('<option>', {
        value: newlevelnum,
        text: newlevelnum
    }));
    $('#leveldropdown').val(newlevelnum);
}

function loadLevel() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.loadLevel($('#leveldropdown').val());
}

function updateDPI() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.updateDPI($("#screeninches").val());
}

function setTargetSequenceLength() {
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.setTargetSequenceLength($("#target-sequence-length").val());
}

function hexToRgb(hex) {
    //Processing uses RGB codes even though the rest of the sane world uses hex, so we need this conversion helper
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function addShapeModal() {
    //boostrap modal creator, with custom css for the color picker to get rid of transparency that I didn't want to use
	$('#cp11').colorpicker({
		customClass: 'colorpicker-2x',
        sliders: {
            saturation: {
                maxLeft: 200,
                maxTop: 200
            },
            hue: {
                maxTop: 200
            },
        }
    });
}

function createGridModal() {
    //boostrap modal creator, with custom css for the color picker to get rid of transparency that I didn't want to use
    $('#gridcolorpick').colorpicker({
        customClass: 'colorpicker-2x',
        sliders: {
            saturation: {
                maxLeft: 200,
                maxTop: 200
            },
            hue: {
                maxTop: 200
            },
        }
    });
}

function createTappingTask() {
    var distance_initial = Number($('#distance_initial').val());
    var distance_delta = Number($('#distance_delta').val());
    var distance_iterations = Number($('#distance_iterations').val());

    var diameter_initial= Number($('#diameter_initial').val());
    var diameter_delta = Number($('#diameter_delta').val());
    var diameter_iterations = Number($('#diameter_iterations').val());

    var angle_initial= Number($('#angle_initial').val());
    var angle_delta = Number($('#angle_delta').val());
    var angle_iterations = Number($('#angle_iterations').val());

    processingInstance = Processing.getInstanceById('mainCanvas');
    var newLevels = processingInstance.createTappingTask(distance_initial, distance_delta, distance_iterations, diameter_initial, diameter_delta, diameter_iterations, angle_initial, angle_delta, angle_iterations);

    $('#leveldropdown').empty();
    var newLevelNum;
    for (var i = 0; i < newLevels.length; i++) {
        newLevelNum = newLevels[i];
        $('#leveldropdown').append($('<option>', {
            value: newLevelNum,
            text: newLevelNum
        }));
        $('#leveldropdown').val(newLevelNum);
    }

    $('.menu-task').hide();
    $('#show-menu-task').show();
    $('#mode').val("Tapping Task");

    $('#tappingTaskModal').modal('toggle');
}

function showMenuTaskOptions() {
    $('.menu-task').show();
    $('#show-menu-task').hide();

    reset();
}

function reset() {
    $('#leveldropdown').empty();
    $('#leveldropdown').append($('<option>', {
        value: 1,
        text: 1
    }));

    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.reset();
}

function fullscreen() {
    //essentially a bunch of CSS trickery to make the screen appear fullscreen by auto scrolling to a full canvas
    processingInstance = Processing.getInstanceById('mainCanvas');
    processingInstance.fullscreen();
    var element = $('#mainCanvas');
    //var requestMethod = element.requestFullScreen;
    document.body.style.overflow = 'hidden';
    $('html, body').animate({
        scrollTop: $("#mainCanvas").offset().top
    },2000);
    $(document).keyup(function(e) {     
        if(e.keyCode== 27) {
            deactivateFullscreen();
        } 
    });
    $('#fullscreenModal').modal('toggle');
}

function deactivateFullscreen() {
    document.body.style.overflow = 'visible';
}
