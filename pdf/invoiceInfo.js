'use strict';

if (!pdfjsLib.getDocument || !pdfjsViewer.PDFPageView) {
  alert('Please build the pdfjs-dist library using\n' +
        '  `gulp dist-install`');
}

// The workerSrc property shall be specified.
//
pdfjsLib.GlobalWorkerOptions.workerSrc =
  '../../node_modules/pdfjs-dist/build/pdf.worker.js';

// Some PDFs need external cmaps.
//
var CMAP_URL = '../../node_modules/pdfjs-dist/cmaps/';
var CMAP_PACKED = true;

var DEFAULT_URL = '../../web/compressed.tracemonkey-pldi-09.pdf';
var PAGE_TO_VIEW = 1;
var SCALE = 1.0;

var container = document.getElementById('pageContainer');

// Loading document.
pdfjsLib.getDocument({
  url: DEFAULT_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
}).then(function(pdfDocument) {
  // Document loaded, retrieving the page.
  return pdfDocument.getPage(PAGE_TO_VIEW).then(function (pdfPage) {
    // Creating the page view with default parameters.
    var pdfPageView = new pdfjsViewer.PDFPageView({
      container: container,
      id: PAGE_TO_VIEW,
      scale: SCALE,
      defaultViewport: pdfPage.getViewport(SCALE),
      // We can enable text/annotations layers, if needed
      textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
      annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
    });
    // Associates the actual page with the view, and drawing it
    pdfPageView.setPdfPage(pdfPage);
    return pdfPageView.draw();
  });
});