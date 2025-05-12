const baseUrl = process.env.NEXTAUTH_URL || "https://zeroonemce.com";

export const joiningEmail = (token) => {
  return `
      <!DOCTYPE html>
  
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900"
          rel="stylesheet" type="text/css" />
      <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          /* a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          } */
  
          #MessageViewBody a {
              /* color: inherit; */
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          .desktop_hide,
          .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
          }
  
          .image_block img+div {
              display: none;
          }
  
          @media (max-width:520px) {
  
              .desktop_hide table.icons-inner,
              .row-3 .column-2 .block-1.social_block .alignment table,
              .social_block.desktop_hide .social-table {
                  display: inline-block !important;
              }
  
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .mobile_hide {
                  display: none;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
  
              .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
              }
  
              .desktop_hide,
              .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
              }
  
              .row-2 .column-1 .block-1.image_block td.pad {
                  padding: 0 30px 10px !important;
              }
  
              .row-1 .column-1 .block-2.divider_block td.pad,
              .row-2 .column-1 .block-2.paragraph_block td.pad {
                  padding: 10px 15px !important;
              }
  
              .row-1 .column-1 .block-2.divider_block .alignment table,
              .row-2 .column-1 .block-5.divider_block .alignment table {
                  display: inline-table;
              }
  
              .row-2 .column-1 .block-2.paragraph_block td.pad>div {
                  text-align: left !important;
              }
  
              .row-2 .column-1 .block-4.paragraph_block td.pad {
                  padding: 10px 15px 25px !important;
              }
  
              .row-2 .column-1 .block-3.button_block td.pad {
                  padding: 25px !important;
              }
  
              .row-2 .column-1 .block-3.button_block a,
              .row-2 .column-1 .block-3.button_block div,
              .row-2 .column-1 .block-3.button_block span {
                  line-height: 32px !important;
              }
  
              .row-3 .column-1 .block-1.paragraph_block td.pad>div {
                  text-align: left !important;
                  font-size: 14px !important;
              }
  
              .row-3 .column-1 .block-1.paragraph_block td.pad {
                  padding: 15px 15px 10px !important;
              }
  
              .row-2 .column-1 .block-5.divider_block td.pad {
                  padding: 0 15px 25px !important;
              }
  
              .row-3 .column-2 .block-1.social_block td.pad {
                  padding: 0 15px 10px !important;
              }
  
              .row-3 .column-2 .block-1.social_block .alignment {
                  text-align: right !important;
              }
          }
      </style>
  </head>
  
  <body style="margin: 0; background-color: #000000; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;" width="100%">
          <tbody>
              <tr>
                  <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div align="center" class="alignment"
                                                                      style="line-height:10px">
                                                                      <div style="max-width: 204px;"><a
                                                                              href="https://zero-one-mce.vercel.app/"
                                                                              style="outline:none" tabindex="-1"
                                                                              target="_blank"><img
                                                                                  src="${baseUrl}/static/images/fullLogo.png"
                                                                                  style="display: block; height: auto; border: 0; width: 100%;"
                                                                                  width="204" /></a></div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="divider_block block-2" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
                                                                  <div align="center" class="alignment">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="100%">
                                                                          <tr>
                                                                              <td class="divider_inner"
                                                                                  style="font-size: 1px; line-height: 1px; border-top: 1px solid #FFFFFF;">
                                                                                  <span> </span>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-left:60px;padding-right:60px;width:100%;">
                                                                  <div align="center" class="alignment"
                                                                      style="line-height:10px">
                                                                      <div style="max-width: 500px;"><img
                                                                              src="${baseUrl}/static/images/congratulation.png"
                                                                              style="display: block; height: auto; border: 0; width: 100%;"
                                                                              width="500" /></div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="paragraph_block block-2" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:30px;">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                      <p style="margin: 0; margin-bottom: 16px;">We are
                                                                          excited to inform you that you have been
                                                                          selected as one of the esteemed members of Zero
                                                                          One Coding Club! <br /><br />Your passion for
                                                                          coding and commitment to excellence stood out,
                                                                          and we believe your skills will contribute
                                                                          immensely to the vibrant coding community we are
                                                                          building at Zero One.</p>
                                                                      <p style="margin: 0;">To get started, simply click
                                                                          the button below to create your account and
                                                                          become a part of our coding community. Welcome
                                                                          aboard!</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="20" cellspacing="0"
                                                          class="button_block block-3" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div align="center" class="alignment">
  
                                                                      <a href="${baseUrl}/activateAccount?token=${token}"
                                                                          style="text-decoration:none;display:inline-block;color:#000000;background-color:#ffffff;border-radius:20px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                                                                          <span
                                                                              style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span
                                                                                  style="word-break: break-word; line-height: 32px;"><strong>Join
                                                                                      us</strong></span></span>
                                                                      </a>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="paragraph_block block-4" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                      <p style="margin: 0;">Best regards,<br />Zero One
                                                                          Coding Club </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="divider_block block-5" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
                                                                  <div align="center" class="alignment">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="100%">
                                                                          <tr>
                                                                              <td class="divider_inner"
                                                                                  style="font-size: 1px; line-height: 1px; border-top: 1px solid #FFFFFF;">
                                                                                  <span> </span>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:18px;">
                                                                      <p style="margin: 0;">${baseUrl}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  <td class="column column-2"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="social_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:10px;padding-left:30px;padding-right:30px;text-align:right;">
                                                                  <div align="right" class="alignment">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          class="social-table" role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;"
                                                                          width="92px">
                                                                          <tr>
                                                                              <td style="padding:0 0 0 14px;"><a
                                                                                      href="https://github.com/zerO-One-Official"
                                                                                      target="_blank"><img alt="Github"
                                                                                          height="32"
                                                                                          src="${baseUrl}/static/images/githubLogo.png"
                                                                                          style="display: block; height: auto; border: 0;"
                                                                                          title="github" width="32" /></a>
                                                                              </td>
                                                                              <td style="padding:0 0 0 14px;"><a
                                                                                      href="https://www.linkedin.com/company/zero-one-coding-club-mce/"
                                                                                      target="_blank"><img alt="Linkedin"
                                                                                          height="32"
                                                                                          src="${baseUrl}/static/images/linkedinLogo.png"
                                                                                          style="display: block; height: auto; border: 0;"
                                                                                          title="linkedin"
                                                                                          width="32" /></a></td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>
  
  </body>
  
  </html>
      `;
};

export const resetEmail = (token) => {
  return `
      <!DOCTYPE html>
  
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  
  <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  
      <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          .desktop_hide,
          .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
          }
  
          .image_block img+div {
              display: none;
          }
  
          @media (max-width:520px) {
  
              .desktop_hide table.icons-inner,
              .social_block.desktop_hide .social-table {
                  display: inline-block !important;
              }
  
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .mobile_hide {
                  display: none;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
  
              .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
              }
  
              .desktop_hide,
              .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
              }
  
              .row-2 .column-1 .block-1.heading_block h2 {
                  font-size: 27px !important;
              }
  
              .row-2 .column-1 .block-4.paragraph_block td.pad {
                  padding: 10px 10px 25px !important;
              }
  
              .row-2 .column-1 .block-2.paragraph_block td.pad {
                  padding: 10px 15px !important;
              }
  
              .row-2 .column-1 .block-3.button_block td.pad {
                  padding: 30px !important;
              }
  
              .row-2 .column-1 .block-3.button_block a,
              .row-2 .column-1 .block-3.button_block div,
              .row-2 .column-1 .block-3.button_block span {
                  line-height: 32px !important;
              }
  
              .row-2 .column-1 .block-5.divider_block td.pad {
                  padding: 10px 10px 30px !important;
              }
  
              .row-2 .column-1 .block-5.divider_block .alignment table {
                  display: inline-table;
              }
  
              .row-3 .column-1 .block-1.image_block td.pad {
                  padding: 0 60px 0 0 !important;
              }
  
              .row-3 .column-2 .block-1.paragraph_block td.pad>div {
                  font-size: 11px !important;
              }
  
              .row-3 .column-2 .block-1.paragraph_block td.pad {
                  padding: 10px !important;
              }
  
              .row-5 .column-1 .block-1.paragraph_block td.pad>div,
              .row-5 .column-2 .block-1.paragraph_block td.pad>div {
                  font-size: 14px !important;
              }
  
              .row-3 .column-1 {
                  padding: 0 !important;
              }
          }
      </style>
  </head>
  
  <body style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
          <tbody>
              <tr>
                  <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div align="center" class="alignment"
                                                                      style="line-height:10px">
                                                                      <div style="max-width: 175px;"><a href="${baseUrl}/"
                                                                              style="outline:none" tabindex="-1"
                                                                              target="_blank"><img
                                                                                  src="${baseUrl}/static/images/fullLogo.png"
                                                                                  style="display: block; height: auto; border: 0; width: 100%;"
                                                                                  width="175" /></a></div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="divider_block block-2" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div align="center" class="alignment">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="100%">
                                                                          <tr>
                                                                              <td class="divider_inner"
                                                                                  style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                  <span> </span>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          class="row-content stack" role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="100%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="heading_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <h2
                                                                      style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 30px; font-weight: 400; letter-spacing: normal; line-height: 200%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 60px;">
                                                                      <span class="tinyMce-placeholder">
                                                                          Reset Your Password
                                                                      </span>
                                                                  </h2>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-2" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                      <p
                                                                          style="margin: 0; margin-bottom: 16px; text-align: center;">
                                                                          We hope this email finds you well. It seems like
                                                                          you've requested a password reset for your
                                                                          account. To regain access, please click the
                                                                          button below to create a new password.
                                                                      </p>
  
                                                                      <table border="0" cellpadding="20" cellspacing="0"
                                                                          class="button_block block-3" role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="100%">
                                                                          <tr>
                                                                              <td class="pad">
                                                                                  <div align="center" class="alignment">
                                                                                      <a href="${baseUrl}/setPassword?token=${token}"
                                                                                          style="text-decoration:none;display:inline-block;color:#000000;background-color:#ffffff;border-radius:20px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                                                                                          <span
                                                                                              style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span
                                                                                                  style="word-break: break-word; line-height: 32px;"><strong>Reset
                                                                                                      Password</strong></span></span>
                                                                                      </a>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                      <p
                                                                          style="margin: 0; font-size: 12px; text-align: center;">
                                                                          If you did not initiate this request, please
                                                                          disregard this email, and your account will
                                                                          remain secure. Ensure your password is unique
                                                                          and confidential to safeguard your account
                                                                          information.
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-4" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                      <p style="margin: 0;">Best regards,<br />Zero One
                                                                          Coding Club</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="divider_block block-5" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div align="center" class="alignment">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                          width="100%">
                                                                          <tr>
                                                                              <td class="divider_inner"
                                                                                  style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                  <span> </span>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="image_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="width:100%;padding-right:0px;padding-left:0px;">
                                                                  <div align="left" class="alignment"
                                                                      style="line-height:10px">
                                                                      <div style="max-width: 144px;"><a href="${baseUrl}/"
                                                                              style="outline:none" tabindex="-1"
                                                                              target="_blank"><img
                                                                                  src="${baseUrl}/static/images/fullLogo.png"
                                                                                  style="display: block; height: auto; border: 0; width: 100%;"
                                                                                  width="144" /></a></div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  <td class="column column-2"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad" style="padding-top:30px;">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;transform: translateY(5px);">
                                                                      <p style="margin: 0;">Official Coding Club of MCE,
                                                                          Mothari</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
                                                                      <p style="margin: 0;"><strong>LINKS</strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  <td class="column column-2"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
                                                                      <p style="margin: 0;"><strong>CONTACT</strong></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                      <p style="margin: 0;"><a href="${baseUrl}/about"
                                                                              rel="noopener"
                                                                              style="text-decoration: none; color: #ffffff;"
                                                                              target="_blank">About Us</a></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  <td class="column column-2"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                      <p style="margin: 0;">zerooneofficial.mce@gmail.com
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
                          role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                          role="presentation"
                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                          width="500">
                                          <tbody>
                                              <tr>
                                                  <td class="column column-1"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="10" cellspacing="0"
                                                          class="paragraph_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad">
                                                                  <div
                                                                      style="color:#ffffff;direction:ltr;font-family:'Poppins', Arial, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                      <p style="margin: 0;"><a href="${baseUrl}/events"
                                                                              rel="noopener"
                                                                              style="text-decoration: none; color: #ffffff;"
                                                                              target="_blank">Events</a></p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                                  <td class="column column-2"
                                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                      width="50%">
                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                          class="social_block block-1" role="presentation"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                          width="100%">
                                                          <tr>
                                                              <td class="pad"
                                                                  style="padding-bottom:10px;padding-left:10px;padding-right:10px;text-align:center;">
                                                                  <div align="center" class="alignment">
                                                                      <table border="0" cellpadding="0" cellspacing="0"
                                                                          class="social-table" role="presentation"
                                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;"
                                                                          width="144px">
                                                                          <tr>
                                                                              <td style="padding:0 2px 0 2px;"><a
                                                                                      href="https://github.com/zerO-One-Official"
                                                                                      target="_blank"><img alt="Github"
                                                                                          height="32"
                                                                                          src="${baseUrl}/static/images/githubLogo.png"
                                                                                          style="display: block; height: auto; border: 0;"
                                                                                          title="GitHub" width="32" /></a>
                                                                              </td>
                                                                              <!-- <td style="padding:0 2px 0 2px;"><a
                                                                                          href="https://www.twitter.com/"
                                                                                          target="_blank"><img alt="Twitter"
                                                                                              height="32"
                                                                                              src="${baseUrl}/static/images/twitter2x.png"
                                                                                              style="display: block; height: auto; border: 0;"
                                                                                              title="twitter"
                                                                                              width="32" /></a>
                                                                                  </td> -->
                                                                              <td style="padding:0 2px 0 2px;"><a
                                                                                      href="https://www.linkedin.com/company/zero-one-coding-club-mce/"
                                                                                      target="_blank"><img alt="Linkedin"
                                                                                          height="32"
                                                                                          src="${baseUrl}/static/images/linkedinLogo.png"
                                                                                          style="display: block; height: auto; border: 0;"
                                                                                          title="Linkedin"
                                                                                          width="32" /></a>
                                                                              </td>
                                                                              <!-- <td style="padding:0 2px 0 2px;"><a
                                                                                          href="https://www.instagram.com/"
                                                                                          target="_blank"><img alt="Instagram"
                                                                                              height="32"
                                                                                              src="${baseUrl}/static/images/instagram2x.png"
                                                                                              style="display: block; height: auto; border: 0;"
                                                                                              title="instagram"
                                                                                              width="32" /></a>
                                                                                          </td> -->
                                                                          </tr>
                                                                      </table>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>
  </body>
  
  </html>
      `;
};

export const contactEmail = (heading, buttonLabel, link = baseUrl, message) => {
  return `<!DOCTYPE HTML
      PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
  
      <style type="text/css">
          @media only screen and (min-width: 520px) {
              .u-row {
                  width: 500px !important;
              }
  
              .u-row .u-col {
                  vertical-align: top;
              }
  
              .u-row .u-col-50 {
                  width: 250px !important;
              }
  
              .u-row .u-col-100 {
                  width: 500px !important;
              }
  
          }
  
          @media (max-width: 520px) {
              .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
              }
  
              .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
              }
  
              .u-row {
                  width: 100% !important;
              }
  
              .u-col {
                  width: 100% !important;
              }
  
              .u-col>div {
                  margin: 0 auto;
              }
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          table,
          tr,
          td {
              vertical-align: top;
              border-collapse: collapse;
          }
  
          p {
              margin: 0;
          }
  
          .ie-container table,
          .mso-container table {
              table-layout: fixed;
          }
  
          * {
              line-height: inherit;
          }
  
          a[x-apple-data-detectors='true'] {
              color: inherit !important;
              text-decoration: none !important;
          }
  
          table,
          td {
              color: #000000;
          }
  
          #u_body a {
              color: #ff3333;
              text-decoration: underline;
          }
  
          @media (max-width: 480px) {
              #u_content_heading_2 .v-container-padding-padding {
                  padding: 15px 10px 10px !important;
              }
  
              #u_content_text_1 .v-container-padding-padding {
                  padding: 16px !important;
              }
  
              #u_content_text_5 .v-color {
                  color: #ff3333 !important;
              }
  
              #u_content_text_5 .v-text-align {
                  text-align: center !important;
              }
          }
      </style>
  
  
  
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"
          type="text/css"><!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body"
      style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body"
          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%"
          cellpadding="0" cellspacing="0">
          <tbody>
              <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
  
  
  
                      <div class="u-row-container" style="padding: 0px;background-color: #dddddd">
                          <div class="u-row"
                              style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                              <div
                                  style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #dddddd;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
  
                                  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #000000;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                  <div class="u-col u-col-100"
                                      style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                                      <div style="background-color: #000000;height: 100%;width: 100% !important;">
                                          <!--[if (!mso)&(!IE)]><!-->
                                          <div
                                              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                              <!--<![endif]-->
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <table width="100%" cellpadding="0" cellspacing="0"
                                                                  border="0">
                                                                  <tr>
  
                                                                      <td class="v-text-align"
                                                                          style="padding-right: 0px;padding-left: 0px;"
                                                                          align="center">
  
                                                                          <a href=${baseUrl}>
                                                                              <img align="center" border="0"
                                                                                  src="${baseUrl}/static/images/fullLogo.png"
                                                                                  alt="ZERO ONE" title="ZERO ONE"
                                                                                  style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 50%;max-width: 240px;"
                                                                                  width="240" />
                                                                          </a>
                                                                      </td>
                                                                  </tr>
                                                              </table>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <table height="0px" align="center" border="0"
                                                                  cellpadding="0" cellspacing="0" width="100%"
                                                                  style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                  <tbody>
                                                                      <tr style="vertical-align: top">
                                                                          <td
                                                                              style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                              <span>&#160;</span>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <table id="u_content_heading_2" style="font-family:'Montserrat',sans-serif;"
                                                  role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                  border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:12px 10px 10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                                              <h1 class="v-color v-text-align"
                                                                  style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-family: inherit; font-size: 22px; font-weight: 400;">
                                                                  <span>${heading}</span>
                                                              </h1>
                                                              <!--[if mso]></td></tr></table><![endif]-->
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <table id="u_content_text_1" style="font-family:'Montserrat',sans-serif;"
                                                  role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                  border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <div class="v-color v-text-align"
                                                                  style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: justify; word-wrap: break-word;">
                                                                  <p style="line-height: 140%;">${message}</p>
  
                                                              </div>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              ${
                                                buttonLabel
                                                  ? `
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:37px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                             
                                                              <div class="v-text-align" align="center">
                                                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href=${baseUrl} style="height:37px; v-text-anchor:middle; width:118px;" arcsize="43%"  stroke="f" fillcolor="#ff3333"><w:anchorlock/><center style="color:#FFFFFF;font-family: inherit; "><![endif]-->
                                                                 
                                                                  <a href=${link} target="_blank"
                                                                      class="v-button"
                                                                      style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ff3333; border-radius: 16px;-webkit-border-radius: 16px; -moz-border-radius: 16px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-family: inherit; font-size: 14px;">
                                                                      <span
                                                                          style="display:block;padding:10px 20px;line-height:120%;"><span
                                                                              style="line-height: 16.8px;">${buttonLabel}</span></span>
                                                                  </a>
                                                                  <!--[if mso]></center></v:roundrect><![endif]-->
                                                              </div>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>`
                                                  : ""
                                              }
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <div class="v-color v-text-align"
                                                                  style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                  <p style="line-height: 140%;">Best Regards,</p>
                                                                  <p style="line-height: 140%;">ZERO ONE </p>
                                                              </div>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <table height="0px" align="center" border="0"
                                                                  cellpadding="0" cellspacing="0" width="100%"
                                                                  style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                  <tbody>
                                                                      <tr style="vertical-align: top">
                                                                          <td
                                                                              style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                              <span>&#160;</span>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <!--[if (!mso)&(!IE)]><!-->
                                          </div><!--<![endif]-->
                                      </div>
                                  </div>
                                  <!--[if (mso)|(IE)]></td><![endif]-->
                                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                              </div>
                          </div>
                      </div>
  
  
  
  
  
                      <div class="u-row-container" style="padding: 0px;background-color: #dddddd">
                          <div class="u-row"
                              style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                              <div
                                  style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #dddddd;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #000000;"><![endif]-->
  
                                  <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #000000;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                  <div class="u-col u-col-50"
                                      style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                                      <div
                                          style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                          <!--[if (!mso)&(!IE)]><!-->
                                          <div
                                              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!--<![endif]-->
  
                                              <table id="u_content_text_5" style="font-family:'Montserrat',sans-serif;"
                                                  role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                  border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <div class="v-color v-text-align"
                                                                  style="font-size: 14px; color: #ff3333; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                  <p style="line-height: 140%;">info@zeroonemce.com</p>
                                                              </div>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <!--[if (!mso)&(!IE)]><!-->
                                          </div><!--<![endif]-->
                                      </div>
                                  </div>
                                  <!--[if (mso)|(IE)]></td><![endif]-->
                                  <!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                  <div class="u-col u-col-50"
                                      style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                                      <div
                                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                          <!--[if (!mso)&(!IE)]><!-->
                                          <div
                                              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!--<![endif]-->
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <div align="center">
                                                                  <div style="display: table; max-width:175px;">
                                                                      <!--[if (mso)|(IE)]><table width="175" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:175px;"><tr><![endif]-->
  
  
                                                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 12px;" valign="top"><![endif]-->
                                                                      <table align="center" border="0" cellspacing="0"
                                                                          cellpadding="0" width="32" height="32"
                                                                          style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 12px">
                                                                          <tbody>
                                                                              <tr style="vertical-align: top">
                                                                                  <td align="center" valign="middle"
                                                                                      style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                      <a href="https://github.com/zerO-One-Official"
                                                                                          title="GitHub" target="_blank">
                                                                                          <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/github.png"
                                                                                              alt="GitHub" title="GitHub"
                                                                                              width="32"
                                                                                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                      </a>
                                                                                  </td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
                                                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 12px;" valign="top"><![endif]-->
                                                                      <table align="center" border="0" cellspacing="0"
                                                                          cellpadding="0" width="32" height="32"
                                                                          style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 12px">
                                                                          <tbody>
                                                                              <tr style="vertical-align: top">
                                                                                  <td align="center" valign="middle"
                                                                                      style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                      <a href="https://linkedin.com/company/zeroonemce"
                                                                                          title="LinkedIn"
                                                                                          target="_blank">
                                                                                          <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png"
                                                                                              alt="LinkedIn"
                                                                                              title="LinkedIn" width="32"
                                                                                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                      </a>
                                                                                  </td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
                                                                     
  
                                                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                      <table align="center" border="0" cellspacing="0"
                                                                          cellpadding="0" width="32" height="32"
                                                                          style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                          <tbody>
                                                                              <tr style="vertical-align: top">
                                                                                  <td align="center" valign="middle"
                                                                                      style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                      <a href="https://whatsapp.com/https://chat.whatsapp.com/HBYOJRWXWDgIoW0H6XNsFw"
                                                                                          title="WhatsApp"
                                                                                          target="_blank">
                                                                                          <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/whatsapp.png"
                                                                                              alt="WhatsApp"
                                                                                              title="WhatsApp" width="32"
                                                                                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                      </a>
                                                                                  </td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
  
                                                                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                  </div>
                                                              </div>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <!--[if (!mso)&(!IE)]><!-->
                                          </div><!--<![endif]-->
                                      </div>
                                  </div>
                                  <!--[if (mso)|(IE)]></td><![endif]-->
                                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                              </div>
                          </div>
                      </div>
  
  
  
  
  
                      <div class="u-row-container" style="padding: 0px;background-color: #dddddd">
                          <div class="u-row"
                              style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
                              <div
                                  style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #dddddd;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #000000;"><![endif]-->
  
                                  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #000000;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                  <div class="u-col u-col-100"
                                      style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                                      <div
                                          style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                          <!--[if (!mso)&(!IE)]><!-->
                                          <div
                                              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!--<![endif]-->
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <table width="100%" cellpadding="0" cellspacing="0"
                                                                  border="0">
                                                                  <tr>
                                                                      <td class="v-text-align"
                                                                          style="padding-right: 0px;padding-left: 0px;"
                                                                          align="center">
                                                                          <a href=${baseUrl}
                                                                              target="_blank">
                                                                              <img align="center" border="0"
                                                                                  src="${baseUrl}/static/images/logo.png"
                                                                                  alt="Logo" title="Logo"
                                                                                  style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 7%;max-width: 32.2px;"
                                                                                  width="32.2" />
                                                                          </a>
                                                                      </td>
                                                                  </tr>
                                                              </table>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                  cellpadding="0" cellspacing="0" width="100%" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td class="v-container-padding-padding"
                                                              style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 25px;font-family:'Montserrat',sans-serif;"
                                                              align="left">
  
                                                              <div class="v-color v-text-align"
                                                                  style="font-size: 14px; color: #aaaaaa; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                  <p style="line-height: 140%;">ZERO ONE Coding Club</p>
                                                                  <p style="line-height: 140%;">Motihari College of
                                                                      Engineering</p>
                                                                  <p style="line-height: 140%;">Motihari (845401)</p>
                                                                  <p style="line-height: 140%;">Bihar</p>
                                                              </div>
  
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
  
                                              <!--[if (!mso)&(!IE)]><!-->
                                          </div><!--<![endif]-->
                                      </div>
                                  </div>
                                  <!--[if (mso)|(IE)]></td><![endif]-->
                                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                              </div>
                          </div>
                      </div>
  
  
  
                      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </td>
              </tr>
          </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`;
};
