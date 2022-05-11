
class Verify {
  
  static ThrowIfNull(obj, msg = "object is null.") {
    if (!obj) {
      throw new Error(msg);
    }
  }  
}

export default Verify;