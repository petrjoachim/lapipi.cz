module.exports = ({ env }) => ({
    upload: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
    email: {
      config: {
        provider: 'mailgun',
        providerOptions: {
          apiKey: env('MAILGUN_API_KEY'),
          domain: env('MAILGUN_DOMAIN'), //Required if you have an account with multiple domains
          host: env('MAILGUN_HOST', 'api.eu.mailgun.net'), //Optional. If domain region is Europe use 'api.eu.mailgun.net'
        },
        settings: {
          defaultFrom: 'info@lapipi.cz',
          defaultReplyTo: 'info@lapipi.cz',
        },
      },
    },
  });