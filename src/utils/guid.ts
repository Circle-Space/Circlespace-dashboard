export class GuidUtils {
  private static readonly DEFAULT_GUID = '00000000-0000-0000-0000-000000000000';
  private static readonly GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    
  /**
   * Ensures the input is a valid GUID.
   * @param input The input to validate.
   * @returns A valid GUID string or the default GUID if input is invalid.
   */
  public static ensureValidGuid(input: any): string {
    if (typeof input === 'string') {
      const trimmedInput = input.trim();
      if (trimmedInput === '' || !this.GUID_REGEX.test(trimmedInput)) {
        return this.DEFAULT_GUID;
      }
      return trimmedInput;
    }

    if (input instanceof Object && 'toString' in input) {
      const stringValue = input.toString();
      if (this.GUID_REGEX.test(stringValue)) {
        return stringValue;
      }
    }

    return this.DEFAULT_GUID;
  }
}
