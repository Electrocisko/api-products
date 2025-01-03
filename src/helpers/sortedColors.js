

const sortedColors = (colorList) => {
    const sortedColorList = colorList.sort((a, b) => {
        const [h1, s1, l1] = a.hsl_code
          .match(/\d+/g)
          .map(Number); // Extrae H, S, L de a
        const [h2, s2, l2] = b.hsl_code
          .match(/\d+/g)
          .map(Number); // Extrae H, S, L de b
  
        // Ordenar por H, luego S, luego L
        return h1 - h2 || s1 - s2 || l1 - l2;
      });

      return sortedColorList
}

export default sortedColors;