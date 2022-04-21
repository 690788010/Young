

class Verify {
  
  static ThrowIfNull(context) {
    if (!context) {
      throw new Error("context");
    }
  }  
}

export default Verify;