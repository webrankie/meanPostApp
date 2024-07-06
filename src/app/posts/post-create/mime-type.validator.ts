import {AbstractControl} from "@angular/forms";
import {Observable, Observer, EMPTY, of} from "rxjs";

export const mimeType = (
  control: AbstractControl
): Observable<{ [p: string]: any }> => {
  if (typeof control.value === 'string') {
    return EMPTY; // Return EMPTY observable if the value is still a string (file not selected yet)
  }

  const file = control.value as File;
  const fileReader = new FileReader();

  return new Observable((observer: Observer<{ [key: string]: any }>) => {
    fileReader.onloadend = () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      let isValid = false;

      // Convert bytes to hexadecimal string
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }

      // Check file signature against known signatures for PNG and JPEG
      switch (header) {
        case "89504e47":
          isValid = true; // PNG file
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true; // JPEG file
          break;
        default:
          isValid = false; // Invalid file type
          break;
      }

      if (isValid) {
        observer.next(EMPTY); // Valid file type, emit null (no error)
      } else {
        observer.next({invalidMimeType: true}); // Invalid file type
      }
      observer.complete(); // Complete the observer
    };

    fileReader.onerror = () => {
      observer.next({invalidMimeType: true}); // Handle potential file reading errors
      observer.complete();
    };

    fileReader.readAsArrayBuffer(file); // Read file as ArrayBuffer
  });
};
