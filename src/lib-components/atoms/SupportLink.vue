<script>
export default {
  name: 'SupportLink',
  props: {
    supportPath: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      supportUrl: 'https://help.adere.so/',
      locale:'es'
    };
  },
  computed: {
    getHelpUrl() {
      return this.supportPath
        ? `${this.supportUrl}${this.supportPath}`
        : this.supportUrl;
    }
  }
}
</script>
<i18n>
  {
    "es": {
      "linkLabel": "Mira la ayuda para esta sección"
    },
    "en": {
      "linkLabel": "Check the help for this section"
    },
    "pt": {
      "linkLabel": "Veja a ajuda para esta seção"
    }
  }
</i18n>
<template>
  <a
    :href="getHelpUrl"
    target="_blank"
    class="btn ads-button ads-button--primary section-header--help">
    <span class="fa fa-question-circle mr-1" />
    {{ $t('linkLabel') }}
  </a>
</template>
