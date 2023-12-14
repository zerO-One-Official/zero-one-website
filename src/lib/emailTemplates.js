export const joiningEmail = (code) => {

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
                                                                        <div style="max-width: 175px;"><a
                                                                                href="${process.env.NEXTAUTH_URL}/"
                                                                                style="outline:none" tabindex="-1"
                                                                                target="_blank"><img src="${process.env.NEXTAUTH_URL}/fullLogo.png"
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
                                                                        <span class="tinyMce-placeholder">Congratulations!
                                                                            🎉 </span>
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
                                                                        <p style="margin: 0; margin-bottom: 16px;">We are
                                                                            excited to inform you that you have been
                                                                            selected as one of the esteemed members of Zero
                                                                            One Coding Club! 🌟👩‍💻<br /><br />Your passion
                                                                            for coding and commitment to excellence stood
                                                                            out, and we believe your skills will contribute
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
                                                                        <a href="${process.env.NEXTAUTH_URL}/signup/${code}"
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
                                                                        <div style="max-width: 144px;"><a
                                                                                href="${process.env.NEXTAUTH_URL}/"
                                                                                style="outline:none" tabindex="-1"
                                                                                target="_blank"><img src="${process.env.NEXTAUTH_URL}/fullLogo.png"
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
                                                                        <p style="margin: 0;"><a
                                                                                href="${process.env.NEXTAUTH_URL}/about"
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
                                                                        <p style="margin: 0;"><a
                                                                                href="${process.env.NEXTAUTH_URL}/events"
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
                                                                                            src="${process.env.NEXTAUTH_URL}/githubLogo.png"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                            title="GitHub" width="32" /></a>
                                                                                </td>
                                                                                <!-- <td style="padding:0 2px 0 2px;"><a
                                                                                        href="https://www.twitter.com/"
                                                                                        target="_blank"><img alt="Twitter"
                                                                                            height="32"
                                                                                            src="${process.env.NEXTAUTH_URL}/twitter2x.png"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                            title="twitter"
                                                                                            width="32" /></a>
                                                                                </td> -->
                                                                                <td style="padding:0 2px 0 2px;"><a
                                                                                        href="https://www.linkedin.com/company/zero-one-coding-club-mce/"
                                                                                        target="_blank"><img alt="Linkedin"
                                                                                            height="32"
                                                                                            src="${process.env.NEXTAUTH_URL}/linkedinLogo.png"
                                                                                            style="display: block; height: auto; border: 0;"
                                                                                            title="Linkedin"
                                                                                            width="32" /></a>
                                                                                </td>
                                                                                <!-- <td style="padding:0 2px 0 2px;"><a
                                                                                        href="https://www.instagram.com/"
                                                                                        target="_blank"><img alt="Instagram"
                                                                                            height="32"
                                                                                            src="${process.env.NEXTAUTH_URL}/instagram2x.png"
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
    `
}