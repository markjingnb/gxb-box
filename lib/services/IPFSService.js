import Promise from 'bluebird'
import ipfsAPI from 'ipfs-api'

export default {
    /**
     * 上传数据到ipfs
     * @param data
     */
    upload: function (data, addrs) {
        if (!(addrs instanceof Array)) {
            addrs=[addrs];
        }
        return new Promise(function (resolve, reject) {
            const inner = (d,index)=>{
                let ipfs_api = ipfsAPI(addrs[index]);
                let obj = {
                    Data: new Buffer(d),
                    Links: []
                }
                ipfs_api.object.put(obj, function (err, node) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let nodeJSON = node.toJSON();
                        resolve(nodeJSON.multihash);
                    }
                })
            }
            inner(data,0);
        })
    },
    /**
     * 通过hash从ipfs下载数据
     * @param hash
     */
    download: function (hash, addrs) {
        if (!(addrs instanceof Array)) {
            addrs=[addrs];
        }
        return new Promise(function (resolve, reject) {
            const inner = (h,index) => {
                let ipfs_api = ipfsAPI(addrs[index]);
                ipfs_api.object.data(h, function (err, data) {
                    if (err) {
                        if(index==addrs.length-1){
                            reject(err);
                        }
                        else{
                            inner(h,index+1);
                        }
                    }
                    else {
                        resolve(data.toString());
                    }
                })
            };
            inner(hash,0);
        })
    }
}