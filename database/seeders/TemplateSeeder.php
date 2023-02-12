<?php

namespace Database\Seeders;

use App\Models\TemplateType;
use Illuminate\Database\Seeder;
use App\Models\Template;

class TemplateSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $MO_Template = array(
      array(
        'id' => '1',
        'TemplateName' => 'Default Label Template',
        'TemplateCode' => 
        '<!DOCTYPE html>
          <html>
              <head>
                  <title>Template for HTML Tag</title>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              </head>
          <body>
          <div style="border:2px solid #000; width:1000px; height:auto;  padding-top:10px; font-family:Arial, Helvetica, sans-serif; font-size:14px;">
              <div style="width:100%; height:auto">
                  <div style="width:48%; padding-left:10px; height:auto; float:left;">
                  <img src="https://app.e-delivery.info/storage/logos/[SHIPMENT_PROVIDER_OWNER].png" style="float:left;margin-left:10px;" alt="[SHIPMENT_PROVIDER_OWNER]" width="172" height="49">
                  </div>
                  <div style="width:50%; height:auto; float:right; text-align:center;font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold">
                  DECLARATION D\'EXPEDITION<br/>- [LAST_MILE_HUB] -
                  </div>
              </div>
              <div style="width:100%; margin-top:100px; height:auto">
                  <div style="width:47%; padding-left:1%; height:auto; float:left;">
                  <b>DATE CREATION:</b> [cREATED_AT]<br/>
                  <b>EXPEDITEUR:</b> [SHIPPER_NAME]<br/>
                  <b>TELEPHONE:</b> [SHIPPER_PHONE]<br/>
                  </div>
                  <div style="width:45%; margin-right:10px; padding:1%; height:auto; float:right; border:2px solid #000;font-family:Arial, Helvetica, sans-serif; font-size:16px;">
                  <b>REFERANCE:</b> [REFERENCE]<br/>
                  <b>DESCRIPTION:</b> [PRODUCT_DESCRIPTION]<br/>
                  </div>
              </div>
              
              <br/><br/><br/>
              <br/><br/>
              <div style="width:100%; height:auto; margin-left: 50px">
              <b>[CHECK_PACKAGE]</b>
              </div>
              <br/>
              <div style="width:100%; height:auto; margin-bottom:30px">
              <center>
          <table width="90%" style="border: 2px solid black; border-collapse: collapse;" border="2">
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="30%"><b>NUMERO D\'EXPEDITION</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="70%"> [TRACKING_NUMBER]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="30%"><b>HUB DESTINATION</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="70%"> [LAST_MILE_HUB]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>CLIENT</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_NAME]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>ADRESSE</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_ADDRESS]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>VILLE</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_CITY]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>TELEPHONE</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_PHONE]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>RETOUR DE FOND</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[AMOUNT_TO_COLLECT]</td>
            </tr>
          </table>
          </center>
              </div>
              <div style="width:100%; height:auto; margin-bottom:40px">
                  <center>
                  <img alt="[TRACKING_NUMBER]" id="[TRACKING_NUMBER]" src="https://app.e-delivery.info/barcode/[TRACKING_NUMBER]" /> 
          
                 </center>
              </div>
          </div>
          <p style="page-break-after: always;">&nbsp;</p>
          </body>
          </html>',
        'TemplateType' => '1',
        'created_at' => '2021-11-30 16:47:31',

        'updated_at' => '2021-11-30 16:47:31',

        'Status' => '1'
      ),
      array(
        'id' => '2',
        'TemplateName' => 'Default Manifest Template',
        'TemplateCode' => '<!DOCTYPE html>
          <html>
          <head>
          <title>Template for HTML Tag</title>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          </head>
          <body>
          <table width="100%" style="border: 1px solid black; border-collapse: collapse;" border="1">
            <tr>
              <td width="40%"><img src="https://www.mazet.shop/img/prestashop-logo-1587937180.jpg" style="float:left; margin-left:10px;" alt="mazer" width="100" height="54"><img src="https://delivery.monetwork.ma/storage/images/mo-network-awb.png" style="float:right;margin-right:10px;" alt="mazer" width="80" height="60"></td>
              <td width="20%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;"><br>MONTANT<br>CRBT<p>[AMOUNT_TO_COLLECT]</p><br></td>
              <td width="40%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;"><br/>
              <p><b>MO NETWORK NUMERO</b></p>
              <br/>
                <div><img alt=\'[TRACKING_NUMBER]\' style=\'margin-left:5px;margin-right:5px;\'
                 src=\'https://barcode.tec-it.com/barcode.ashx?data=*[TRACKING_NUMBER]*&code=Code128&width=70&height=20\'/></div><br/>
                <p>[TRACKING_NUMBER]</p><br></td>
            </tr>
            <tr style="font-family:Arial, Helvetica, sans-serif; font-size:16px;">
              <td colspan="2" style="padding:10px 0 10px 10px;">
                <p><span style="font-weight:bold; margin-left:10px;"><u>EXPEDITEUR :</u> </span><br><br>
                <span style="font-weight:bold;">MAZET Parfums et Cosmétiques </span><br>
                <span>SD Development Sarl </span><br>
                <span>Adresse: Parc Logistique Ouchtar Km13 Route d\'EL Jadida Lissasfa Casablanca</span><br>
                <span>Email: contact@mazet.shop </span><br>
                <span>Service Client Whatsapp: <b>0777 129 805</b></span><br>
                </p>
                <p><span style="font-weight:bold; margin-left:10px;"><u>DESTINATAIRE :</u> </span><br><br>
                <span style="font-weight:bold;">Nom & Prémon: </span>[CUSTOMER_NAME]<br>
                <span style="font-weight:bold;">Adresse: </span>[ADDRESS]<br>
                <span style="font-weight:bold;">Ville: </span>[CITY]<br>
                <span style="font-weight:bold;">TEL: </span>[PHONE_NUMBER]<br>
              </td>
              <td align="center"><p><b>NUMERO DE SUIVI</b></p>
                <br/>
                <div><img alt=\'[REFERENCE]\' style=\'margin-left:5px;margin-right:5px;\'
                 src=\'https://barcode.tec-it.com/barcode.ashx?data=*[REFERENCE]*&code=Code128&width=70&height=20\'/></div><br/>
                 <span style="font-weight:bold;">[REFERENCE] </span>   </td>
            </tr>
            </table>
          <p style="page-break-after: always;">&nbsp;</p>
          </body>
          </html>',
        'TemplateType' => '2',
        'created_at' => '2021-11-30 16:47:31',

        'updated_at' => '2021-11-30 16:45:38',

        'Status' => '1'
      ),
      array(
        'id' => '3',
        'TemplateName' => 'New Manifest',
        'TemplateCode' => '<!DOCTYPE html>
          <html>
          <head>
          <title>Template for HTML Tag</title>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          </head>
          <body>
          <table width="100%" style="border: 1px solid black; border-collapse: collapse;" border="1">
            <tr>
              <td width="50%"><img src="https://i.ibb.co/jVQyP6t/E-log-2.png" style="float:left;margin-left:10px;" alt="" width="172" height="49"></td>
              <td width="20%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;"><br>Amount to Collect<p>[AMOUNT_TO_COLLECT]</p><br></td>
              <td width="30%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;"><br>Reference<p>[REFERENCE]</p><br></td>
            </tr>
            <tr style="font-family:Arial, Helvetica, sans-serif; font-size:16px;">
              <td colspan="2"><br>
                <span style="font-weight:bold; margin-left:10px;">Nom & Prémon: </span>[CUSTOMER_NAME]
                <p><span style="font-weight:bold; margin-left:10px;">Adresse: </span>[ADDRESS]</p>
                <p><span style="font-weight:bold; margin-left:10px;">Ville: </span>[CITY]</p>
                <p><span style="font-weight:bold; margin-left:10px;">TEL: </span>[PHONE_NUMBER]</p>
                <p><span style="font-weight:bold; margin-left:10px;">Description: </span>[PRODUCT_DESCRIPTION]</p>
                <br/>      </td>
              <td align="center"><p><b>Tracking Number</b></p>
                <br/>
                <div><img alt=\'[TRACKING_NUMBER]\'
                 src=\'https://barcode.tec-it.com/barcode.ashx?data=*[TRACKING_NUMBER]*&code=Code128&width=70&height=20\'/></div><br/>
                [TRACKING_NUMBER]
                </td>
            </tr>
            </table>
          <p style="page-break-after: always;">&nbsp;</p>
          </body>
          </html>',
        'TemplateType' => '2',
        'created_at' => '2021-11-30 16:47:31',

        'updated_at' => '2021-12-13 22:18:29',

        'Status' => '1'
      ),
      array(
        'id' => '4',
        'TemplateName' => 'Aramex label',
        'TemplateCode' => '<!DOCTYPE html>
          <html>
              <head>
                  <title>Template for HTML Tag</title>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <script src="http://demo.modelivery.xyz/vendor/barcode/JsBarcode.all.js"></script>
                  <script>
                      Number.prototype.zeroPadding = function(){
                          var ret = "" + this.valueOf();
                          return ret.length == 1 ? "0" + ret : ret;
                      };
                  </script>
              </head>
          <body>
          <div style="border:2px solid #000; width:1000px; height:auto;  padding-top:10px; font-family:Arial, Helvetica, sans-serif; font-size:14px;">
              <div style="width:100%; height:auto">
                  <div style="width:48%; padding-left:10px; height:auto; float:left;">
                  <img src="https://delivery.monetwork.ma/storage/logos/[SHIPPER_SP_OWNER].png" style="float:left;margin-left:10px;" alt="[SHIPPER_SP_OWNER]" width="172" height="49">
                  </div>
                  <div style="width:50%; height:auto; float:right; text-align:center;font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold">
                  DECLARATION D\'EXPEDITION<br/>- [FIRSTMILEHUB] -
                  </div>
              </div>
              <div style="width:100%; margin-top:100px; height:auto">
                  <div style="width:47%; padding-left:1%; height:auto; float:left;">
                  <b>DATE CREATION:</b> [cREATED_AT]<br/>
                  <b>EXPEDITEUR:</b> [SHIPPER_USER]<br/>
                  <b>TELEPHONE:</b> [SHIPPER_PHONE_NUMBER]<br/>
                  </div>
                  <div style="width:45%; margin-right:10px; padding:1%; height:auto; float:right; border:2px solid #000;font-family:Arial, Helvetica, sans-serif; font-size:16px;">
                  <b>REFERANCE:</b> [REFERENCE]<br/>
                  <b>DESCRIPTION:</b> [PRODUCT_DESCRIPTION]<br/>
                  </div>
              </div>
              
              
              <br/><br/><br/>
              <br/><br/><br/>
              <div style="width:100%; height:auto; margin-bottom:30px">
              <center>
          <table width="90%" style="border: 2px solid black; border-collapse: collapse;" border="2">
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="30%"><b>NUMERO D\'EXPEDITION</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="70%"> [TRACKING_NUMBER]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="30%"><b>HUB DESTINATION</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;" width="70%"> [LASTMILEHUB]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>CLIENT</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_NAME]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>ADRESSE</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_ADDRESS]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>VILLE</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_CITY]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>TELEPHONE</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[CUSTOMER_PHONE_NUMBER]</td>
            </tr>
            <tr>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;"><b>RETOUR DE FOND</b></td>
              <td style="padding:5px; border: 2px dotted black; border-collapse: collapse;">[AMOUNT_TO_COLLECT]</td>
            </tr>
          </table>
          </center>
              </div>
              <div style="width:100%; height:auto; margin-bottom:40px">
                  <center>
                  <img alt=\'[TRACKING_NUMBER]\' id="[TRACKING_NUMBER]" /> 
          
                 </center>
              </div>
          </div>
          <script>
              JsBarcode("#[TRACKING_NUMBER]", "[TRACKING_NUMBER]", {
                  format:"CODE128",
                  displayValue:true,
                  width:2,
                  height:50,
                  fontSize:20
              });
          </script>
          <p style="page-break-after: always;">&nbsp;</p>
          </body>
          </html>',
        'TemplateType' => '1',
        'created_at' => '2021-12-02 09:41:41',

        'updated_at' => '2021-12-13 22:17:52',

        'Status' => '1'
      ),
      array(
        'id' => '5',
        'TemplateName' => 'AMANA Label',
        'TemplateCode' => '<div class="row">
          
              <div class="col-md-12">
          
                  <!-- Default -->
                  <div class="panel panel-light editor-panel">
                      <div class="panel-header">
                          <h1 class="panel-title">[CUSTOMER_NAME]</h1>
                      </div>
                      <div class="panel-body" style="color: #5a637d; ">
          
                      </div>
                  </div><!-- / Default -->
          
              </div><!-- .col-md-12 -->
          
          </div>',
        'TemplateType' => '2',
        'created_at' => '2021-12-02 11:16:38',

        'updated_at' => '2022-01-18 23:20:49',

        'Status' => '1'
      ),
      array(
        'id' => '6',
        'TemplateName' => 'CTM Label',
        'TemplateCode' => '<div class="row">
          
              <div class="col-md-12">
          
                  <!-- Default -->
                  <div class="panel panel-light editor-panel">
                      <div class="panel-header">
                          <h1 class="panel-title">Default</h1>
                      </div>
                      <div class="panel-body" style="color: #5a637d; ">
          
                      </div>
                  </div><!-- / Default -->
          
              </div><!-- .col-md-12 -->
          
          </div>',
        'TemplateType' => '1',
        'created_at' => '2021-12-04 05:41:11',

        'updated_at' => '2022-01-05 09:53:50',

        'Status' => '1'
      ),
      array(
        'id' => '7',
        'TemplateName' => 'DHL Label',
        'TemplateCode' => '<div class="row">
          
              <div class="col-md-12">
          
                  <!-- Default -->
                  <div class="panel panel-light editor-panel">
                      <div class="panel-header">
                          <h1 class="panel-title">Default</h1>
                      </div>
                      <div class="panel-body" style="color: #5a637d; ">
          
                      </div>
                  </div><!-- / Default -->
          
              </div><!-- .col-md-12 -->
          
          </div>',
        'TemplateType' => '1',
        'created_at' => '2021-12-06 18:28:15',

        'updated_at' => '2021-12-13 22:17:52',

        'Status' => '1'
      ),
      array(
        'id' => '8',
        'TemplateName' => 'UPS Label',
        'TemplateCode' => '<div class="row">
          
              <div class="col-md-12">
          
                  <!-- Default -->
                  <div class="panel panel-light editor-panel">
                      <div class="panel-header">
                          <h1 class="panel-title">Default</h1>
                      </div>
                      <div class="panel-body" style="color: #5a637d; ">
          
                      </div>
                  </div><!-- / Default -->
          
              </div><!-- .col-md-12 -->
          
          </div>',
        'TemplateType' => '1',
        'created_at' => '2021-12-06 21:32:44',

        'updated_at' => '2021-12-13 22:17:52',

        'Status' => '1'
      ),
      array('id' => '9', 'TemplateName' => 'Test Label', 'TemplateCode' => '', 'TemplateType' => '1', 'created_at' => '2021-12-07 13:51:14', 'updated_at' => '2021-12-13 22:17:52', 'Status' => '1'),
      array('id' => '10', 'TemplateName' => 'test 5', 'TemplateCode' => '', 'TemplateType' => '1', 'created_at' => '2021-12-07 13:56:17', 'updated_at' => '2021-12-13 22:17:52', 'Status' => '1'),
      array(
        'id' => '11',
        'TemplateName' => 'Amazon lable2',
        'TemplateCode' => '<!DOCTYPE html>
          <html>
          <head>
          <title>Template for HTML Tag</title>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          </head>
          <body>
          <table width="100%" style="border: 1px solid black; border-collapse: collapse;" border="1">
            <tr>
              <td width="50%"><img src="https://i.ibb.co/jVQyP6t/E-log-2.png" style="float:left;margin-left:10px;" alt="" width="172" height="49"></td>
              <td width="20%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;"><br>Amount to Collect<p>[AMOUNT_TO_COLLECT]</p><br></td>
              <td width="30%" align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;"><br>Reference<p>[REFERENCE]</p><br></td>
            </tr>
            <tr style="font-family:Arial, Helvetica, sans-serif; font-size:16px;">
              <td colspan="2"><br>
                <span style="font-weight:bold; margin-left:10px;">Nom & Prémon: </span>[CUSTOMER_NAME]
                <p><span style="font-weight:bold; margin-left:10px;">Adresse: </span>[ADDRESS]</p>
                <p><span style="font-weight:bold; margin-left:10px;">Ville: </span>[CITY]</p>
                <p><span style="font-weight:bold; margin-left:10px;">TEL: </span>[PHONE_NUMBER]</p>
                <p><span style="font-weight:bold; margin-left:10px;">Description: </span>[PRODUCT_DESCRIPTION]</p>
                <br/>      </td>
              <td align="center"><p><b>Tracking Number</b></p>
                <br/>
                <div><img alt=\'[TRACKING_NUMBER]\'
                 src=\'https://barcode.tec-it.com/barcode.ashx?data=*[TRACKING_NUMBER]*&code=Code128&width=70&height=20\'/></div><br/>
                [TRACKING_NUMBER]
                </td>
            </tr>
            </table>
          <p style="page-break-after: always;">&nbsp;</p>
          </body>
          </html>',
        'TemplateType' => '1',
        'created_at' => '2021-12-07 14:34:54',

        'updated_at' => '2021-12-13 22:17:52',

        'Status' => '1'
      ),
      array('id' => '12', 'TemplateName' => 'TESt', 'TemplateCode' => 'hello world!', 'TemplateType' => '1', 'created_at' => '2021-12-08 16:47:31', 'updated_at' => '2022-02-16 13:44:28', 'Status' => '1'),
      array('id' => '13', 'TemplateName' => 'template test', 'TemplateCode' => 'hdhfhdfhdfjhdf', 'TemplateType' => '2', 'created_at' => '2021-12-15 10:14:27', 'updated_at' => '2022-02-16 13:44:32', 'Status' => '1'),
      array('id' => '14', 'TemplateName' => 'good day', 'TemplateCode' => '', 'TemplateType' => '3', 'created_at' => '2021-12-16 14:46:43', 'updated_at' => '2022-02-16 13:44:34', 'Status' => '1')
    );
    collect($MO_Template)->each(function ($m) {
      Template::create($m);
    });

  }
}