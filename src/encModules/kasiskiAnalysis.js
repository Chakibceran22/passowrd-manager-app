let data = null

const kasiskiAnalysis = (processedText, ) => {
    // Find repeating sequences of at least 3 characters
    const repeats = {};
    const minLength = 3; // Minimum sequence length to consider

    for (let length = minLength; length <= 5; length++) { // Consider sequences up to 5 chars
      for (let i = 0; i <= processedText.length - length; i++) {
        const sequence = processedText.substring(i, i + length);

        // Find all occurrences of this sequence
        let positions = [];
        let pos = processedText.indexOf(sequence);
        while (pos !== -1) {
          positions.push(pos);
          pos = processedText.indexOf(sequence, pos + 1);
        }

        // Only consider sequences that appear multiple times
        if (positions.length > 1 && !repeats[sequence]) {
          repeats[sequence] = positions;
        }
      }
    }

    // Calculate distances between occurrences
    const distances = [];
    const sequenceData = [];

    for (const sequence in repeats) {
      const positions = repeats[sequence];
      const sequenceDistances = [];

      for (let i = 1; i < positions.length; i++) {
        const distance = positions[i] - positions[i - 1];
        sequenceDistances.push(distance);
        distances.push(distance);
      }

      sequenceData.push({
        sequence,
        positions: positions.join(', '),
        distances: sequenceDistances.join(', '),
        length: sequence.length
      });
    }

    // Get the GCD (Greatest Common Divisor) of all distances
    const gcd = (a, b) => b ? gcd(b, a % b) : a;

    const findGCDOfArray = (arr) => {
      let result = arr[0];
      for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
      }
      return result;
    };

    const possibleKeyLengths = distances.length > 0 ? findGCDOfArray(distances) : 0;

    // Sort sequences by length (longer first) then by occurrence count
    sequenceData.sort((a, b) => {
      if (b.length !== a.length) return b.length - a.length;
      return b.positions.split(',').length - a.positions.split(',').length;
    });

    data = {
      type: 'kasiski',
      title: 'Kasiski Examination',
      sequences: sequenceData,
      possibleKeyLengths: possibleKeyLengths,
      headers: ['Sequence', 'Length', 'Positions', 'Distances']
    };
    return [sequenceData, data, possibleKeyLengths]
}

export {kasiskiAnalysis}