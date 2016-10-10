import { CameraRoll } from 'react-native';
import NativeModules from 'NativeModules';

export default function getCameraRoll(acceptRequest, requestId) {
    const ref = new Firebase(`https://gimmie.firebaseio.com/requests/${requestId}`);

    if (!acceptRequest) {
        ref.child('accepted').set(false);
        return;
    }

    ref.child('accepted').set(true);

    CameraRoll.getPhotos({first: 2}).then((data) => {
        const allData = [];

        data.edges.forEach((dataNode, index) => {
            convertPhoto(dataNode.node.image.uri).then((resolve) => {
                    allData.push(resolve);
                    if (allData.length === data.edges.length) {
                        const obj = {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                'imgArray': allData,
                                requestId
                            })
                        }

                        fetch('http://localhost:3000/firebaseSaveImg', obj).then((res) => {
                            console.log(res);
                        });
                    }

            });
        });
    });
}

function convertPhoto(imageBase64) {
    return new Promise((resolve) => {
        const extLocation = imageBase64.search('ext=');
        // ie: 'png, jpg, etc'
        const extType = imageBase64.slice(extLocation, imageBase64.length).replace('ext=', '');

        NativeModules.ReadImageData.readImage(imageBase64, (base64String) => {
            resolve({ext: extType, base64String: base64String});
        })
    });
}