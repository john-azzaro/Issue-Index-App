FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
);

FilePond.setOptions({
  stylePanelAspectRatio: 100/100
})

FilePond.parse(document.body);