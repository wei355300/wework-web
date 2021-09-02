
export function parseFileName(mediaUrl: string): string {
    let fileSplits = mediaUrl.split('/') || [];
    let s = fileSplits?.length || 0;
    let fileName = fileSplits[s - 1];
    return fileName;
}