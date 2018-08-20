## Integrating Embark with the Status app
We can use integrate our Embark dApp with the Status app using the [Embark-Status plugin](https://github.com/status-im/embark-status) for Embark. The plugin will first connect the Status app to our Embark node, and then open the Status dApp browser to run our dApp.

### Install the `embark-status` plugin
```
npm install --save embark-status
```

Add the following config to our `embark.json`:
```
"plugins": {
    "embark-status": {
        "deviceIp": "<your-device-ip>",
        "name": "DReddit"
    }
}
```
**Blockchain client**

Set `config/blockchain.js > development > rpcHost` to `0.0.0.0`. This will open up your blockchain client (Geth or Parity) to outside connections.

**Webserver**

Set `config/webserver.js > host` to `0.0.0.0`. This will open up your webserver to outside connections.

> NOTE: When the Status browser opens the dApp, it will open the IP of the machine running Embark along with the port specified in the webserver config, ie http://192.168.0.15:8000. This is so that the device can connect to the webserver started by Embark.

### Install the correct build of Status
For devcon, we have a nightly build of the Status app that has features supporting the embark-status plugin. Unfortunatley, at the time of this writing, this is only supported on Android, but rest assured, the release supporting iOS is on it's way soon! Please scan the following QR code to install the .apk:
![Download the Android nightly with embark-status support](https://i.imgur.com/oP6Awmc.png)
> NOTE: Installing this build of the Status app will require you to overwrite your currently installed Status app and you may lose your contacts.

### Restart Embark
After the plugin has been installed and the config updated, we need to restart Embark so that the plugin can be registered correctly.

This can be done by typing `quit` in the cli dashboard console or with `Ctrl+c`.

### Integration
Please make sure the Status app is open and you are logged in. The plugin should add an `Embark (DReddit)` network to the Status app, then ask the app to connect to the network. This will cause the app to restart, and you will be asked to enter your password again.

Once logged back in, the dApp browser should fire up automatically and your DReddit dApp should appear!