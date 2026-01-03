/* URL.createObjectURL(file) is generally better than FileReader.readAsDataURL(file) for most common use cases, especially image/video/audio previews after file selection. */

export const fileToURL = (file: File) => {
	return URL.createObjectURL(file);
};
