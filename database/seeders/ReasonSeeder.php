<?php

namespace Database\Seeders;

use App\Models\Reason;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MO_Reason = array(
            array('id' => '1', 'ReasonName' => 'Adresse erronée', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '2', 'ReasonName' => 'Annulé à cause du retard', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '3', 'ReasonName' => 'Client injoignable', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '1'),
            array('id' => '4', 'ReasonName' => 'Client occupe/indisponible', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '1'),
            array('id' => '5', 'ReasonName' => 'Colis perdu/volé durant la livraison', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '6', 'ReasonName' => 'Commande doublon', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '8', 'ReasonName' => 'Le client ne veut pas payer les frais d\'expédition', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '9', 'ReasonName' => 'Le client incapable de payer', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '1'),
            array('id' => '10', 'ReasonName' => 'Le client a été demandé d\'annuler sa commande', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '12', 'ReasonName' => 'Le numéro de téléphone invalide', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '15', 'ReasonName' => 'Qualité - colis endommagé', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '16', 'ReasonName' => 'Le client réclame consolidation des colis', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '1'),
            array('id' => '17', 'ReasonName' => 'La commande reçu en mauvais état', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '18', 'ReasonName' => 'Le fournisseur a annulé la commande', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '19', 'ReasonName' => 'Colis perdu/volé durant la collecte', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '20', 'ReasonName' => 'Commande doublon', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '21', 'ReasonName' => 'La commande n\'est pas prêt', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '22', 'ReasonName' => 'Erreur sur les documents/facture manquante', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '23', 'ReasonName' => 'Le fournisseur injoignable', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '24', 'ReasonName' => 'Le fournisseur occupe/indisponible', 'Workflow' => '[1]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '27', 'ReasonName' => 'Qualité - colis endommagé', 'Workflow' => '[3]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '28', 'ReasonName' => 'Colis perdu/volé durant la livraison', 'Workflow' => '[3]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '29', 'ReasonName' => 'Le fournisseur injoignable/ne décroche pas', 'Workflow' => '[3]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '30', 'ReasonName' => 'Le fournisseur occupe/indisponible', 'Workflow' => '[3]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '31', 'ReasonName' => 'Pluie - éléments naturels', 'Workflow' => '[3]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '0'),
            array('id' => '33', 'ReasonName' => 'Le client a reporté sa commande', 'Workflow' => '[2]', 'MaxAttempts' => '0', 'NextStatus' => 1, 'Options' => '1')
        );
        collect($MO_Reason)->each(function ($m) {
            Reason::create($m);
        });
    }
}