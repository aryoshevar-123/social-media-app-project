export function cloudinaryImgId(imgLink) {
    if (!imgLink) {
        return imgLink;
    }
    const imgId = imgLink.split("/").pop().split(".")[0];
    return imgId;
}