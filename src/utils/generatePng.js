export const setupGeneratePngButton = () => {
  const button = document.getElementById("generate-png");
  if (!button) {
    console.error("Generate PNG button not found!");
    return;
  }

  button.addEventListener("click", () => {
    const svg = document.querySelector("#new-chess svg");
    if (!svg) {
      console.error("SVG not found!");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();

    const scaleFactor = 2; // Increase resolution by 2x
    const width = parseInt(svg.getAttribute("width"));
    const height = parseInt(svg.getAttribute("height"));

    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    context.scale(scaleFactor, scaleFactor);

    img.onload = () => {
      context.drawImage(img, 0, 0);
      const pngData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngData;
      link.download = "chessboard.png";
      link.click();
    };

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  });
};
