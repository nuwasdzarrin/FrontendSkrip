<template>
  <div>
    <!-- <img src="https://www.chestysoft.com/imagefile/javascript/rectangle.asp" width="400" height="300" alt="" id="myImgId" /> -->
    <button id="nextbutton" type="button">next page</button>
    <button id="prevbutton" type="button">prev page</button>
    <button id="zoominbutton" type="button">zoom in</button>
    <button id="zoomoutbutton" type="button">zoom out</button>
    <br />
    <canvas id="the-canvas" style="border:1px  solid black"></canvas>
    <p>
      X:
      <span id="x"></span>
    </p>
    <p>
      Y:
      <span id="y"></span>
    </p>
  </div>
</template>



<script>
export default {
  data() {
    return {
      position: null,
      pageNum : 1,
      pdfScale : 1,
      shownPdf : '',
      url : "http://localhost:58187/api/uploadpdf?nameFile=ForCekTandaTangan.pdf"
    };
  },

  mounted() {
    var myImg = document.getElementById("the-canvas");
    myImg.onmousedown = this.GetCoordinates;
    this.position = this.FindPosition(myImg);

    this.fetchPDF();
  },

  methods: {
    fetchPDF() {
      console.log(this.url)
      return import(
        'pdfjs-dist/webpack'
      ).
        then(pdfjs => pdfjs.getDocument(this.url)).
        then(pdf => (this.displayPage(pdf, 1))).
        then(pdf => (this.pdf = pdf))
    },
    FindPosition(oElement) {
      if (typeof oElement.offsetParent != "undefined") {
        for (
          var posX = 0, posY = 0;
          oElement;
          oElement = oElement.offsetParent
        ) {
          posX += oElement.offsetLeft;
          posY += oElement.offsetTop;
        }
        return [posX, posY];
      } else {
        return [oElement.x, oElement.y];
      }
    },

    GetCoordinates(e) {
      // console.log(e);
      var PosX = 0;
      var PosY = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
        PosX = e.pageX;
        PosY = e.pageY;
      } else if (e.clientX || e.clientY) {
        PosX =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        PosY =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      PosX = PosX - this.position[0];
      PosY = PosY - this.position[1];
      document.getElementById("x").innerHTML = PosX;
      document.getElementById("y").innerHTML = PosY;
    },

    renderPage(page) {
      var scale = this.pdfScale; // render with global pdfScale variable
      var viewport = page.getViewport(scale);
      var canvas = document.getElementById("the-canvas");
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    },

    displayPage(pdf, num) {
      var vm = this;
      pdf.getPage(num).then(function getPage(page) {
        vm.renderPage(page);
      });
    }
  }
};
</script>


