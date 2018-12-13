
export   function forEachViewport(callback) {
  var elements = $('.viewport');
  $.each(elements, function(index, value) {
      var element = value;
      try {
          callback(element);
      }
      catch(e) {

      }
  });
}
export  function ImageViewer (root, viewport) {
    var self = this;
  
    self.root = root;
    self.stacks = [];
    self.viewports = [];
    self.layout = '1x2';
    self.viewportModel = viewport;
  
    self.setLayout = function(layout) {
        self.layout = layout;
        var ab = self.getRowsCols(), a = ab[0], b = ab[1], numOfViewports = a * b,
            perWidth = 100 / b, perHeight = 100 / a;
        self.root.find('.imageViewer').html('');
        var i = 0;
        self.viewports = [];
        while (i < numOfViewports) {
          var elem = self.viewportModel.clone().css({
            width : perWidth + '%', height : perHeight + '%'
          }).appendTo(self.root.find('.imageViewer'));
          elem.find('.viewport').data('index', i).data('waiting', true);
  
          self.viewports.push(elem);
          i++;
        }
    }
  
    self.getRowsCols = function() {
      var s = self.layout.split(/x/);
      return [parseInt(s[0]), parseInt(s[1])];
    }
  
    self.isSingle = function() {
      return self.layout == '1x1';
    }
  
    self.getElement = function(item) {
      return self.viewports[item].find('.viewport')[0];
    }
  
    self.forEachElement = function(cb) {
      self.viewports.forEach(function(vp, i){
        cb.call(self, vp.find('.viewport')[0], vp, i);
      });
    }
  }
  
  
  export  function loadTemplate(data, callback) {
      var parsed = $.parseHTML(data);
      $.each(parsed, function(index, ele) {
          if(ele.nodeName === 'DIV')
          {
              var element = $(ele);
              callback(element);
          }
      });
  }
export  function disableAllTools(cornerstone,cornerstoneTools) {
  forEachViewport(function(element) {
      cornerstoneTools.wwwc.disable(element);
      cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
      cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
      cornerstoneTools.probe.deactivate(element, 1);
      cornerstoneTools.length.deactivate(element, 1);
      cornerstoneTools.angle.deactivate(element, 1);
      cornerstoneTools.ellipticalRoi.deactivate(element, 1);
      cornerstoneTools.rectangleRoi.deactivate(element, 1);
      cornerstoneTools.stackScroll.deactivate(element, 1);
      cornerstoneTools.wwwcTouchDrag.deactivate(element);
      cornerstoneTools.zoomTouchDrag.deactivate(element);
      cornerstoneTools.panTouchDrag.deactivate(element);
      cornerstoneTools.stackScrollTouchDrag.deactivate(element);
  });
}

export   function displayThumbnail(cornerstone,cornerstoneTools,seriesList, seriesElement, element, stack, loaded) {
  // Deactivate other thumbnails
  $(seriesList).find('a').each(function() {
      $(this).removeClass('active');
  });

  // Make this series visible

  // Make the selected thumbnail active
  $(seriesElement).addClass('active');

  var enabledImage = cornerstone.getEnabledElement(element);
  if (enabledImage.image) {
      // Stop clip from if playing on element
      cornerstoneTools.stopClip(element);
      // Disable stack scrolling
      cornerstoneTools.stackScroll.disable(element);
      // Enable stackScroll on selected series
      cornerstoneTools.stackScroll.enable(element);
  }

  // Load the first image of the selected series stack
  cornerstone.loadAndCacheImage(stack.imageIds[0]).then(function(image) {
      if (loaded) {
          loaded.call(image, element, stack);
      }

      // Get the state of the stack tool
      var stackState = cornerstoneTools.getToolState(element, 'stack');
      stackState.data[0] = stack;
      stackState.data[0].currentImageIdIndex = 0;

      // Get the default viewport
      var defViewport = cornerstone.getDefaultViewport(element, image);
      // Get the current series stack index
      // Display the image
      cornerstone.displayImage(element, image, defViewport);
      // Fit the image to the viewport window
      cornerstone.fitToWindow(element);

      // Prefetch the remaining images in the stack (?)
      cornerstoneTools.stackPrefetch.enable(element);

      // Play clip if stack is a movie (has framerate)
      if (stack.frameRate !== undefined) {
          cornerstoneTools.playClip(element, stack.frameRate);
      }
  });
}




export  function setupButtons(cornerstone,cornerstoneTools,studyViewer) {
  // Get the button elements
  var buttons = $(studyViewer).find('button');

  // Tool button event handlers that set the new active tool

  // WW/WL
  $(buttons[0]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.wwwc.activate(element, 1);
          cornerstoneTools.wwwcTouchDrag.activate(element);
      });
  });

  // Invert
  $(buttons[1]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          var viewport = cornerstone.getViewport(element);
          // Toggle invert
          if (viewport.invert === true) {
              viewport.invert = false;
          } else {
              viewport.invert = true;
          }
          cornerstone.setViewport(element, viewport);
      });
  });

  // Zoom
  $(buttons[2]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.zoom.activate(element, 5); // 5 is right mouse button and left mouse button
          cornerstoneTools.zoomTouchDrag.activate(element);
      });
  });

  // Pan
  $(buttons[3]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.pan.activate(element, 3); // 3 is middle mouse button and left mouse button
          cornerstoneTools.panTouchDrag.activate(element);
      });
  });

  // Stack scroll
  $(buttons[4]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.stackScroll.activate(element, 1);
          cornerstoneTools.stackScrollTouchDrag.activate(element);
      });
  });

  // Length measurement
  $(buttons[5]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.length.activate(element, 1);
      });
  });

  // Angle measurement
  $(buttons[6]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.angle.activate(element, 1);
      });
  });

  // Pixel probe
  $(buttons[7]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.probe.activate(element, 1);
      });
  });

  // Elliptical ROI
  $(buttons[8]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function(element) {
          cornerstoneTools.ellipticalRoi.activate(element, 1);
      });
  });

  // Rectangle ROI
  $(buttons[9]).on('click touchstart', function() {
      disableAllTools(cornerstone,cornerstoneTools) ;
      forEachViewport(function (element) {
          cornerstoneTools.rectangleRoi.activate(element, 1);
      });
  });

  // Play clip
  $(buttons[10]).on('click touchstart', function() {
      forEachViewport(function(element) {
        var stackState = cornerstoneTools.getToolState(element, 'stack');
        var frameRate = stackState.data[0].frameRate;
        // Play at a default 10 FPS if the framerate is not specified
        if (frameRate === undefined) {
          frameRate = 10;
        }
        cornerstoneTools.playClip(element, frameRate);
      });
  });

  // Stop clip
  $(buttons[11]).on('click touchstart', function() {
      forEachViewport(function(element) {
          cornerstoneTools.stopClip(element);
      });
  });
  // Stop clip
  $(buttons[13]).on('click touchstart', function() {
      forEachViewport(function(element) {
         var viewport = cornerstone.getViewport(element);
         viewport.rotation += 90;
           cornerstone.setViewport(element, viewport);
      });
  });
 // Stop clip
  $(buttons[14]).on('click touchstart', function() {
      forEachViewport(function(element) {
         console.log("**************"+element);
         var viewport = cornerstone.getViewport(element);
         viewport.rotation -= 90;
         cornerstoneTools.rotate.strategy = cornerstoneTools.rotate.strategies.default;
           cornerstoneTools.rotate.activate(element, 1);
           cornerstoneTools.rotateTouchDrag.activate(element);
           cornerstone.setViewport(element, viewport);
      });
  });
  // Tooltips
  /*$(buttons[0]).tooltip();
  $(buttons[1]).tooltip();
  $(buttons[2]).tooltip();
  $(buttons[3]).tooltip();
  $(buttons[4]).tooltip();
  $(buttons[5]).tooltip();
  $(buttons[6]).tooltip();
  $(buttons[7]).tooltip();
  $(buttons[8]).tooltip();
  $(buttons[9]).tooltip();
  $(buttons[10]).tooltip();
  $(buttons[11]).tooltip();
  $(buttons[12]).tooltip();
  $(buttons[13]).tooltip();
  $(buttons[14]).tooltip();*/
};


export  function setupViewport(cornerstone,cornerstoneTools,element, stack, image) {
  // Display the image on the viewer element
  cornerstone.displayImage(element, image);

  // If it's a movie (has frames), then play the clip
  if (stack.frameRate !== undefined) {
      cornerstone.playClip(element, stack.frameRate);
  }

  // Activate mouse clicks, mouse wheel and touch
  cornerstoneTools.mouseInput.enable(element);
  cornerstoneTools.mouseWheelInput.enable(element);
  cornerstoneTools.touchInput.enable(element);

  // Enable all tools we want to use with this element
  cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
  cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
  cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
  cornerstoneTools.probe.enable(element);
  cornerstoneTools.length.enable(element);
  cornerstoneTools.ellipticalRoi.enable(element);
  cornerstoneTools.rectangleRoi.enable(element);
  cornerstoneTools.wwwcTouchDrag.activate(element);
  cornerstoneTools.zoomTouchPinch.activate(element);

  // Stack tools
  cornerstoneTools.addStackStateManager(element, ['playClip']);
  cornerstoneTools.addToolState(element, 'stack', stack);
  cornerstoneTools.stackScrollWheel.activate(element);
  cornerstoneTools.stackPrefetch.enable(element);


}


export  function setupViewportOverlays(cornerstone,cornerstoneTools,element, data) {
  var parent = $(element).parent();

  // Get the overlays
  var childDivs = $(parent).find('.overlay');
  var topLeft = $(childDivs[0]).find('div');
  var topRight = $(childDivs[1]).find('div');
  var bottomLeft = $(childDivs[2]).find('div');
  var bottomRight = $(childDivs[3]).find('div');

  // Set the overlay text
  $(topLeft[0]).text(data.patientName);
  $(topLeft[1]).text(data.patientId);
  $(topRight[0]).text(data.studyDescription);
  $(topRight[1]).text(data.studyDate);


  // On new image (displayed?)
  function onNewImage(e, eventData) {
      // If we are currently playing a clip then update the FPS
      // Get the state of the 'playClip tool'
      var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');

      // If playing a clip ...
      if (playClipToolData !== undefined && playClipToolData.data.length > 0 && playClipToolData.data[0].intervalId !== undefined && eventData.frameRate !== undefined) {

          // Update FPS
          $(bottomLeft[0]).text("FPS: " + Math.round(eventData.frameRate));
          console.log('frameRate: ' + e.frameRate);

      } else {
          // Set FPS empty if not playing a clip
          if ($(bottomLeft[0]).text().length > 0) {
              $(bottomLeft[0]).text("");
          }
      }

      var toolData = cornerstoneTools.getToolState(element, 'stack');
      if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
          return;
      }
      var stack = toolData.data[0];

      // Update Image number overlay
      $(bottomLeft[2]).text("图像 # " + (stack.currentImageIdIndex + 1) + "/" + stack.imageIds.length);
  }
  // Add a CornerstoneNewImage event listener on the 'element' (viewer) (?)
  $(element).on("CornerstoneNewImage", onNewImage);


  // On image rendered
  function onImageRendered(e, eventData) {
      // Set zoom overlay text
      $(bottomRight[0]).text("缩放:" + eventData.viewport.scale.toFixed(2));
      // Set WW/WL overlay text
      $(bottomRight[1]).text("宽度/高度:" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter));
      // Set render time overlay text
      $(bottomLeft[1]).text("阅读时间:" + eventData.renderTimeInMs + "毫秒");
  }
  // Add a CornerstoneImageRendered event listener on the 'element' (viewer) (?)
  $(element).on("CornerstoneImageRendered", onImageRendered);


}


export  function loadStudy(cornerstone,cornerstoneTools,studyViewer, viewportModel, id,data) {
  var data = $.parseJSON('{"patientName":"MISTER^MR","patientId":"832040","studyDate":"20010108","modality":"MR","studyDescription":"BRAIN SELLA","numImages":17,"studyId":"mrstudy","seriesList":[{"seriesDescription":"3-PLANE LOC","seriesNumber":"1","instanceList":[{"imageId":"MRStudy/MR000000.dcm"},{"imageId":"MRStudy/MR000001.dcm"},{"imageId":"MRStudy/MR000002.dcm"},{"imageId":"MRStudy/MR000003.dcm"},{"imageId":"MRStudy/MR000003.dcm"},{"imageId":"MRStudy/MR000004.dcm"},{"imageId":"MRStudy/MR000005.dcm"},{"imageId":"MRStudy/MR000006.dcm"},{"imageId":"MRStudy/MR000007.dcm"},{"imageId":"MRStudy/MR000008.dcm"}]},{"seriesDescription":"SAG T-1","seriesNumber":"2","instanceList":[{"imageId":"MRStudy/MR000009.dcm"},{"imageId":"MRStudy/MR000010.dcm"},{"imageId":"MRStudy/MR000011.dcm"},{"imageId":"MRStudy/MR000012.dcm"}]}]}');
  //console.log("*************************"+data)
var imageViewer = new  ImageViewer(studyViewer, viewportModel);
imageViewer.setLayout('1x2'); // default layout
  function initViewports() {
      imageViewer.forEachElement(function (el) {
          cornerstone.enable(el);
          $(el).droppable({
              drop: function (evt, ui) {
                  var fromStack = $(ui.draggable.context).data('stack'),
                      toItem = $(this).data('index');
                  useItemStack(cornerstone,cornerstoneTools,toItem, fromStack);
              }
          });
      });
  }
  setupButtons(cornerstone,cornerstoneTools,studyViewer);
  //布局选择
  $(studyViewer).find('.choose-layout a').click(function () {
      var previousUsed = [];
      imageViewer.forEachElement(function (el, vp, i) {
          if (!isNaN($(el).data('useStack'))) {
              previousUsed.push($(el).data('useStack'));
          }
      });

      var type = $(this).text();
      imageViewer.setLayout(type);
      initViewports();
      resizeStudyViewer();
      if (previousUsed.length > 0) {
          previousUsed = previousUsed.slice(0, imageViewer.viewports.length);
          var item = 0;
          previousUsed.forEach(function (v) {
              useItemStack(cornerstone,cornerstoneTools,item++, v);
          });
      }

      //return false;
  });

  // 将第一个系列加载到viewport (?)
  //var stacks = [];
  //var currentStackIndex = 0;
  var seriesIndex = 0;

  
  data.seriesList.forEach(function (series) {
      var stack = {
          seriesDescription: series.seriesDescription,
          stackId: series.seriesNumber,
          imageIds: [],
          seriesIndex: seriesIndex,
          currentImageIdIndex: 0,
          frameRate: series.frameRate
      };
      //console.log(stack);

      // 用每个系列的 imageIds 填充 imageIds 数组
      // 对于具有帧信息的系列，通过请求每个帧获取图像url
      if (series.numberOfFrames !== undefined) {
          var numberOfFrames = series.numberOfFrames;
          for (var i = 0; i < numberOfFrames; i++) {
              var imageId = series.instanceList[0].imageId + "?frame=" + i;
              if (imageId.substr(0, 4) !== 'http') {
                  imageId = "dicomweb://192.168.0.130/testDICOM/" + imageId; //"dicomweb://192.168.0.130/testDICOM/" + imageId;
              }
              stack.imageIds.push(imageId);
          }
          // Otherwise, get each instance url
      } else {
          series.instanceList.forEach(function (image) {
              var imageId = image.imageId;
              if (image.imageId.substr(0, 4) !== 'http') {
                  imageId = "dicomweb://192.168.0.130/testDICOM/" + imageId;
              }
              stack.imageIds.push(imageId);
          });
      }
      // Move to next series
      seriesIndex++;

      // Add the series stack to the stacks array
      imageViewer.stacks.push(stack);
  });
  
  // Resize the parent div of the viewport to fit the screen
  var imageViewerElement = $(studyViewer).find('.imageViewer')[0];
  var viewportWrapper = $(imageViewerElement).find('.viewportWrapper')[0];
  var parentDiv = $(studyViewer).find('.viewer')[0];

  //viewportWrapper.style.width = (parentDiv.style.width - 10) + "px";
  //viewportWrapper.style.height = (window.innerHeight - 150) + "px";

  var studyRow = $(studyViewer).find('.studyRow')[0];
  var width = $(studyRow).width();

  //$(parentDiv).width(width - 170);
  //viewportWrapper.style.width = (parentDiv.style.width - 10) + "px";
  //viewportWrapper.style.height = (window.innerHeight - 150) + "px";

  // Get the viewport elements
  var element = $(studyViewer).find('.viewport')[0];

  // Image enable the dicomImage element
  initViewports();
  //cornerstone.enable(element);

  // Get series list from the series thumbnails (?)
  var seriesList = $(studyViewer).find('.thumbnails')[0];
  imageViewer.stacks.forEach(function (stack, stackIndex) {

      // Create series thumbnail item
      var seriesEntry = '<a class="list-group-item" + ' +
          'oncontextmenu="return false"' +
          'unselectable="on"' +
          'onselectstart="return false;"' +
          'onmousedown="return false;">' +
          '<div class="csthumbnail"' +
          'oncontextmenu="return false"' +
          'unselectable="on"' +
          'onselectstart="return false;"' +
          'onmousedown="return false;"></div>' +
          "<div class='text-center small'>" + stack.seriesDescription + '</div></a>';

      // Add to series list
      var seriesElement = $(seriesEntry).appendTo(seriesList);

      // Find thumbnail
      var thumbnail = $(seriesElement).find('div')[0];

      // Enable cornerstone on the thumbnail
      cornerstone.enable(thumbnail);

      // Have cornerstone load the thumbnail image
      cornerstone.loadAndCacheImage(imageViewer.stacks[stack.seriesIndex].imageIds[0]).then(function (image) {
          // Make the first thumbnail active
          if (stack.seriesIndex === 0) {
              $(seriesElement).addClass('active');
          }
          // Display the image
          cornerstone.displayImage(thumbnail, image);
          $(seriesElement).draggable({
              helper: "clone"
          });
      });

      // Handle thumbnail click
      $(seriesElement).on('click touchstart', function () {
          useItemStack(cornerstone,cornerstoneTools,0, stackIndex);
      }).data('stack', stackIndex);
  });

  function useItemStack(cornerstone,cornerstoneTools,item, stack) {
      var imageId = imageViewer.stacks[stack].imageIds[0],
          element = imageViewer.getElement(item);
      if ($(element).data('waiting')) {
          imageViewer.viewports[item].find('.overlay-text').remove();
          $(element).data('waiting', false);
      }
      $(element).data('useStack', stack);

      displayThumbnail(cornerstone,cornerstoneTools,seriesList, $(seriesList).find('.list-group-item')[stack], element, imageViewer.stacks[stack], function (el, stack) {
          if (!$(el).data('setup')) {
              setupViewport(cornerstone,cornerstoneTools,el, stack, this);
              setupViewportOverlays(cornerstone,cornerstoneTools,el, data);
              $(el).data('setup', true);
          }
      });
      /*cornerstone.loadAndCacheImage(imageId).then(function(image){
          setupViewport(element, imageViewer.stacks[stack], image);
          setupViewportOverlays(element, data);
      });*/
  }
  // Resize study viewer
  function resizeStudyViewer() {
      var studyRow = $(studyViewer).find('.studyContainer')[0];
      var height = $(studyRow).height();
      var width = $(studyRow).width();
      //console.log($(studyRow).innerWidth(), $(studyRow).outerWidth(), $(studyRow).width());
      $(seriesList).height("100%");
      $(parentDiv).width(width - $(studyViewer).find('.thumbnailSelector:eq(0)').width());
      $(parentDiv).css({
          height: '100%'
      });
      $(imageViewerElement).css({
          height: $(parentDiv).height() - $(parentDiv).find('.text-center:eq(0)').height()
      });

      imageViewer.forEachElement(function (el, vp) {
          cornerstone.resize(el, true);

          if ($(el).data('waiting')) {
              var ol = vp.find('.overlay-text');
              if (ol.length < 1) {
                  ol = $('<div class="overlay overlay-text">请把图片拖过来</div>').appendTo(vp);
              }
              var ow = vp.width() / 2,
                  oh = vp.height() / 2;
              ol.css({
                  top: oh,
                  left: ow - (ol.width() / 2)
              });
          }
      });
  }
  // Call resize viewer on window resize
  $(window).resize(function () {
      resizeStudyViewer();
  });
  resizeStudyViewer();
  if (imageViewer.isSingle())
      useItemStack(cornerstone,cornerstoneTools,0, 0);

  
/*  console.log(studyViewer);
  // 获取选定的 studyId 的JSON数据
  $.getJSON('studies/' + studyId, function (data) {});*/
}