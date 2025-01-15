import { Component, OnInit , AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  Tab,
  initTWE,
} from "tw-elements";



initTWE({ Tab });
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  title = 'bilal';
  num1: number = 0;
  num2: number = 0;
  result: number | string = '';
  isMobileMenuOpen = false;
  url1 = 'https://view.modelcreate.com/';


  safeUrl1: SafeResourceUrl | undefined;
  safeUrl2: SafeResourceUrl | undefined;


  ngOnInit(): void {
    this.safeUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url1);

  }


  add() {
    this.result = this.num1 + this.num2;
  }

  subtract() {
    this.result = this.num1 - this.num2;
  }

  multiply() {
    this.result = this.num1 * this.num2;
  }

  divide() {
    if (this.num2 !== 0) {
      this.result = this.num1 / this.num2;
    } else {
      this.result = 'Division par zéro';
    }
  }

  reset() {
    this.num1 = 0;
    this.num2 = 0;
    this.result = '';
  }


  value: number = 0;
  sourceUnit: string = 'Pa';
  targetUnit: string = 'bar';
  result2: number | string = '';

  convert() {
    // Conversion des unités en Pascal pour faciliter le calcul
    let valueInPa: number;

    switch (this.sourceUnit) {
      case 'Pa':
        valueInPa = this.value;
        break;
      case 'bar':
        valueInPa = this.value * 1e5; // 1 bar = 100000 Pa
        break;
      case 'atm':
        valueInPa = this.value * 101325; // 1 atm = 101325 Pa
        break;
      default:
        this.result2 = 'Unité source non supportée';
        return;
    }

    // Conversion de Pascal à l'unité cible
    switch (this.targetUnit) {
      case 'Pa':
        this.result2 = valueInPa;
        break;
      case 'bar':
        this.result2 = valueInPa / 1e5;
        break;
      case 'atm':
        this.result2 = valueInPa / 101325;
        break;
      default:
        this.result2 = 'Unité cible non supportée';
        break;
    }
  }





  value2: number = 0;
  sourceUnit2: string = 'L/s';
  targetUnit2: string = 'm³/j';
  result3: number | string = '';

  // Conversion constants
  private readonly LPS_TO_M3S = 0.001; // 1 L/s = 0.001 m³/s
  private readonly LPS_TO_LPM = 60;    // 1 L/s = 60 L/min
  private readonly M3S_TO_LPS = 1000; // 1 m³/s = 1000 L/s
  private readonly M3J_TO_LPS = 0.0000115741; // 1 m³/j = 0.0000115741 L/s

  convert2() {
    let valueInLPS: number;

    // Convert source unit to Litres per seconde
    switch (this.sourceUnit2) {
      case 'L/s':
        valueInLPS = this.value2;
        break;
      case 'm³/j':
        valueInLPS = this.value2 * this.M3J_TO_LPS;
        break;
      case 'm³/s':
        valueInLPS = this.value2 * this.M3S_TO_LPS;
        break;
      case 'L/min':
        valueInLPS = this.value2 / this.LPS_TO_LPM;
        break;
      default:
        this.result3 = 'Unité source non supportée';
        return;
    }

    // Convert Litres per seconde to target unit
    switch (this.targetUnit2) {
      case 'L/s':
        this.result3 = valueInLPS;
        break;
      case 'm³/j':
        this.result3 = valueInLPS / this.M3J_TO_LPS;
        break;
      case 'm³/s':
        this.result3 = valueInLPS * this.LPS_TO_M3S;
        break;
      case 'L/min':
        this.result3 = valueInLPS * this.LPS_TO_LPM;
        break;
      default:
        this.result3 = 'Unité cible non supportée';
        break;
    }
  }



  //liste des Cours

  courses = [
    { id: "1", name: 'Hydraulique générale', description: 'Introduction aux principes de base de l’hydraulique...' },
    { id: "2", name: 'Hydraulique urbaine', description: 'Étude des systèmes hydrauliques dans les environnements urbains...' },
    { id: "3", name: 'Hydrologie', description: 'Analyse du cycle de l’eau et des ressources hydrologiques...' },
    { id: "4", name: 'Aménagements hydrauliques', description: 'Conception et gestion des infrastructures hydrauliques...' },
    { id: "5", name: 'Qualité des eaux', description: 'Évaluation et gestion de la qualité des ressources en eau...' },
    { id: "6", name: 'Gestion et planification des ressources en eau', description: 'Stratégies pour la gestion durable des ressources en eau...' },
    { id: "7", name: 'Assainissement', description: 'Technologies et méthodes pour le traitement des eaux usées...' },
    { id: "8", name: 'Ressources en eau non conventionnelles', description: 'Utilisation et gestion des ressources en eau alternatives...' },
    { id: "9", name: 'Législation Marocaine de l’eau', description: 'Réglementations et lois relatives à l’eau au Maroc...' },
    { id: "10", name: 'Mécanique des fluides', description: 'Étude des forces et des mouvements des fluides...' },
    { id: "11", name: 'Les accessoires hydrauliques', description: 'Introduction aux différents accessoires utilisés dans les reseaux hydrauliques...' },
    { id: "12", name: "Pression et Pertes de charge", description: "Étude des principes de pression et des pertes de charge dans les systèmes..." },

  ];


  searchCours: string = '';
  errorMessage: string = '';
  get filteredCourses() {
    const results = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchCours.toLowerCase())
    );

    // Mettre à jour le message d'erreur
    this.errorMessage = results.length === 0 ? 'Aucun cours trouvé' : '';

    return results;
  }

  onSearch(event: Event) {
    event.preventDefault(); // Prevent form submission
    // The filteredCourses getter automatically updates the errorMessage
  }
  downloadPDF(id: string): void {
    const link = document.createElement('a');
    link.href = `assets/cours/${id}.pdf`;
    link.download = id;
    link.click();
  }
  downloadHyd(): void {
    const link = document.createElement('a');
    link.href = `assets/Hydraulique.pdf`;
    link.click();
  }





  //liste des Cours

  exercices = [
    { id: "1", name: 'CALCUL DE LA FORCE RÉSULTANTE DE L’EAU', description:"Une station de traitement d’eau utilise une série de vannes pour contrôler le flux d’eau dans ses canaux..." },
    { id: "2", name: 'CALCUL DE LA PRESSION DANS UN RÉSERVOIR', description: "Calcul de la Pression dans un Réservoir d'Eau Comprendre le Calcul de la Pression dans un Réservoir d'Eau..." },
    { id: "3", name: 'CALCUL DU DÉBIT D’UN CANAL PAR L’ÉQUATION DE BAZIN', description: "Calcul du Débit d'un Canal par l'Équation de Bazin Comprendre le Calcul du Débit d'un Canal par l'Équation de Bazin Dans une région agricole..." },
    { id: "4", name: 'CALCUL DE PUISSANCE POUR UNE POMPE À EAU', description: "Calcul de Puissance pour une Pompe à Eau Comprendre le Calcul de Puissance pour une Pompe à Eau..." },
    { id: "5", name: 'CALCUL DU FACTEUR DE FRICTION DE DARCYWEISBACH', description: "Dans une installation industrielle, un fluide est transporté à travers un tuyau horizontal de 500 mètres de longueur..." },
    { id: "6", name: 'CALCUL DE LA POSITION DU CENTRE DE POUSSÉE', description: "Une des étapes clés de la conception des barrages est de déterminer la stabilité du barrage face à la pression de l’eau..." },
    { id: "7", name: 'SYSTÈME D’IRRIGATION À PARTIR D’UNE RIVIÈRE LOCALE', description: "Le projet vise à optimiser l’utilisation de l’eau tout en garantissant une alimentation suffisante pour tous les champs cultivés..." },
    { id: "8", name: 'PRESSION DANS UNE CONDUITE DE FLUIDES PARFAITS', description: " une conduite relie deux réservoirs d’eau, l’un situé à une altitude supérieure (réservoir A) et l’autre à une altitude inférieure (réservoir B)..." },
    { id: "9", name: 'ÉTUDE DE LA VARIATION DE PRESSION', description: "Le barrage retient de l’eau douce et forme un réservoir dont la profondeur maximale est de 50 mètres..." },
    { id: "10", name: 'GESTION DES EAUX PLUVIALES HYDRAULIQUE', description: "Un ingénieur hydraulique doit concevoir un système de drainage pour un nouveau lotissement. Le terrain a une superficie de 2 hectares..." },
    { id: "11", name: 'POUSSÉE D’ARCHIMÈDE DANS L’EAU', description: "Un ingénieur en génie civil doit concevoir un pont flottant pour une rivière. Pour cela, il envisage d’utiliser des cylindres en béton..." },
    { id: "12", name: 'ANALYSE DE L’ÉCOULEMENT DANS UNE CONDUITE', description: "Une conduite d’eau horizontale de diamètre D = 0.5 m et de longueur L = 100 m transporte de l’eau à une température de 20°C..." },
    { id: "13", name: 'ANALYSE LA DEMANDE EN EAU', description: "La ville de « AquaVille » est en train de planifier son approvisionnement en eau potable pour les 20 prochaines années..." },
    { id: "14", name: 'CONSERVATION DE LA MASSE POUR UN FLUIDE', description: "Considérons un système de tuyauterie utilisé dans une installation de traitement des eaux. L’eau s’écoule..." },
    { id: "15", name: 'FORCES EXERCÉES PAR L’EAU SUR LES PORTES', description: "Vous êtes ingénieur hydraulique et travaillez sur la conception d’une nouvelle écluse. Il est crucial de comprendre les forces exercées..." },
    { id: "16", name: 'ANALYSER LES FORCES EXERCÉES PAR UN FLUIDE', description: "Vous êtes un ingénieur hydraulique dans une entreprise spécialisée dans la conception et la construction de réservoirs destinés à stocker..." },
    { id: "17", name: 'ÉTUDE DE LA PRESSION HYDROSTATIQUE', description: "Dans le cadre de la conception d’une écluse fluviale, un ingénieur doit déterminer les forces exercées par l’eau sur les portes..." },
    { id: "18", name: 'ÉVALUATION DU RISQUE DE RENARD', description: "Une petite ville est située à proximité d’une rivière et est protégée des inondations par une digue...." },
    { id: "19", name: 'ÉQUATIONS D’EULER ET DE BERNOULLI', description: "Considérons un fluide incompressible s’écoulant dans un tube horizontal de diamètres différents....." },
    { id: "20", name: 'STOCKAGE DE L’EAU POTABLE', description: "La ville de Clairville souhaite améliorer son système de stockage de l’eau potable. Actuellement,..." },
    { id: "21", name: 'TRAITEMENT DE L’EAU POTABLE', description: "Vous êtes ingénieur en traitement de l’eau et travaillez sur la conception d’une station de traitement d’eau..." },
    { id: "22", name: 'ANALYSE DE LA POUSSÉE HYDROSTATIQUE', description: "Vous êtes ingénieur(e) en hydraulique et vous travaillez sur le projet de conception d’un barrage..." },
    { id: "23", name: 'RÉSEAU DE DISTRIBUTION D’EAU POTABLE', description: "La ville de Claraville envisage d’étendre son réseau de distribution en eau potable pour desservir..." },
    { id: "24", name: 'PROPRIÉTÉS PHYSIQUES DES FLUIDES', description: "Vous êtes un ingénieur débutant travaillant pour ABC Génie Civil. Vous avez pour mission de concevoir un système..." },


  ];


  searchExercices: string = '';
  errorMessageExercices: string = '';
  get filteredExercices() {
    const results = this.exercices.filter(exo =>
      exo.name.toLowerCase().includes(this.searchExercices.toLowerCase())
    );

    // Mettre à jour le message d'erreur
    this.errorMessage = results.length === 0 ? 'Aucun cours trouvé' : '';

    return results;
  }

  onSearchExercices(event: Event) {
    event.preventDefault(); // Prevent form submission
    // The filteredCourses getter automatically updates the errorMessage
  }
  downloadPDFExercices(id: string): void {
    const link = document.createElement('a');
    link.href = `assets/exo/${id}.pdf`;
    link.download = id;
    link.click();
  }




  downloadInc(id: any): void {
    const link = document.createElement('a');
    link.href = `assets/inc/${id}.pdf`;
    link.download = id;
    link.click();
  }






  //liste des Cours

  Incs = [
    { id: "1", name: 'generale' },
    { id: "2", name: 'urbaine'},
    { id: "3", name: 'Hydrologie'},
    { id: "4", name: 'qualite'},
    { id: "5", name: 'gestion'},
    { id: "6", name: 'assainissement'},
    { id: "7", name: 'conception'},
    { id: "8", name: 'epuration'},

  ];


//exercices Pagination
  currentPage = 1;
  itemsPerPage = 6; // Nombre d'éléments par page

  get paginatedExercices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredExercices.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredExercices.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollToTop();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



//FAQs
Faqs = [
  { id: "1", Q: "Qu'est-ce que la cavitation ?", R: "La cavitation est un phénomène qui se produit lorsqu'une pression dans un liquide descend en dessous de sa pression de vapeur, entraînant la formation de bulles de vapeur. Lorsque ces bulles se déplacent vers des zones de pression plus élevée, elles implosent, provoquant des chocs et des vibrations qui peuvent endommager les surfaces des équipements." },
  { id: "2", Q: 'Comment prévenir la cavitation dans les pompes ?', R: "Pour prévenir la cavitation, il est important de s'assurer que la pression d'entrée de la pompe est suffisamment élevée et de choisir des pompes adaptées à la viscosité et à la température du fluide. Une conception adéquate des conduites et des coudes peut également aider à maintenir la pression." },
  { id: "3", Q: "Qu'est-ce qu'un ressaut hydraulique ?", R: "Un ressaut hydraulique est une augmentation soudaine de la hauteur d'eau dans un cours d'eau ou une conduite, souvent causée par un obstacle ou une modification de la géométrie. Ce phénomène peut entraîner des variations importantes de pression et des perturbations dans le flux." },
  { id: "4", Q: "Quels sont les effets d'un ressaut hydraulique sur un système hydraulique ?", R: "Les effets d'un ressaut hydraulique peuvent inclure des fluctuations de pression, des vibrations, et des variations de débit. Dans certains cas, cela peut endommager les équipements et affecter la performance globale du système." },
  { id: "5", Q: "Quelles sont les pertes de charge dans un système hydraulique ?", R: "Les pertes de charge se réfèrent à la diminution de pression d'un fluide en raison de la friction dans les conduites, des changements de direction, et des obstacles. Elles sont essentielles à prendre en compte lors de la conception de systèmes hydrauliques pour garantir un fonctionnement efficace." },
  { id: "6", Q: "Comment calculer les pertes de charge dans une conduite ?", R: "Les pertes de charge peuvent être calculées à l'aide de la formule de Darcy-Weisbach, qui prend en compte la longueur de la conduite, le diamètre, la vitesse du fluide et le coefficient de frottement. Des tables et des logiciels spécialisés peuvent également faciliter ce calcul." },
  { id: "7", Q: "Quel est le rôle des vannes dans un système hydraulique ?", R: "Les vannes régulent le débit et la pression du fluide dans un système hydraulique. Elles peuvent également servir à isoler des sections du système pour la maintenance ou à contrôler des processus spécifiques." },
  { id: "8", Q: "Qu'est-ce que la turbulence et comment affecte-t-elle les systèmes hydrauliques ?", R: "La turbulence est un état d'écoulement désordonné des fluides, qui peut augmenter les pertes de charge et réduire l'efficacité des systèmes hydrauliques. Une conception appropriée des conduites peut aider à minimiser la turbulence." },
  { id: "9", Q: "Qu'est-ce que la pression hydrostatique ?", R: " La pression hydrostatique est la pression exercée par un fluide au repos en raison de son poids. Elle augmente avec la profondeur dans un fluide et est calculée en multipliant la hauteur de la colonne de liquide par la densité du fluide et la gravité." },
  { id: "10", Q: "Comment la loi de Bernoulli s'applique-t-elle aux systèmes hydrauliques ?", R: "La loi de Bernoulli établit une relation entre la pression, la vitesse et l'altitude d'un fluide en mouvement. Elle indique que dans un flux idéal, une augmentation de la vitesse du fluide entraîne une diminution de la pression." },
  { id: "11", Q: "Qu'est-ce qu'un siphon et comment fonctionne-t-il ?", R: "Un siphon est un dispositif qui permet de transférer un fluide d'un niveau élevé à un niveau plus bas en utilisant la gravité et la pression atmosphérique. Il fonctionne grâce à la différence de hauteur entre les deux réservoirs et nécessite une boucle pour maintenir le flux." },
  { id: "12", Q: "Quelles sont les causes des bruits dans les systèmes hydrauliques ?", R: "Les bruits dans les systèmes hydrauliques peuvent être causés par plusieurs facteurs, tels que des bulles d'air dans le fluide, des vibrations des composants, ou des changements brusques de pression." },
  { id: "13", Q: "Qu'est-ce que le renard hydraulique ?", R: "Le renard hydraulique est un phénomène de perte de charge et d'accumulation de sédiments qui se produit dans les cours d'eau. Il se manifeste lorsque l'eau s'écoule à une vitesse suffisamment élevée pour entraîner des particules solides, ce qui peut entraîner une érosion des rives et des fondations." },
  { id: "14", Q: "Qu'est-ce que le coup de bélier ?", R: "Le coup de bélier est un phénomène hydraulique qui se produit lorsqu'il y a une variation soudaine de la vitesse d'écoulement d'un fluide, généralement causée par la fermeture rapide d'une vanne. Cette variation de pression peut provoquer des chocs dans les conduites, entraînant des dommages potentiels." },
  { id: "15", Q: "Comment prévenir le coup de bélier dans un système hydraulique ?", R: "Pour prévenir le coup de bélier, il est recommandé d'installer des dispositifs d'amortissement comme des réservoirs d'accumulation, d'utiliser des vannes à fermeture lente et de concevoir des systèmes avec des variations de débit plus douces." },
  { id: "16", Q: "Qu'est-ce que l'écoulement laminaire ?", R: "L'écoulement laminaire se produit lorsque la vitesse du fluide est faible, permettant aux couches de fluide de glisser les unes sur les autres sans mélanger. Ce type d'écoulement est caractérisé par une faible résistance à l'écoulement et est généralement observé dans des conduites de petit diamètre ou à des débits faibles." },
  { id: "17", Q: "Qu'est-ce que l'écoulement turbulent ?", R: "L'écoulement turbulent est caractérisé par des mouvements chaotiques et mélangés des particules de fluide. Ce type d'écoulement se produit à des vitesses élevées et dans des conduites de grand diamètre, entraînant des pertes de charge plus importantes en raison de la friction." },
  { id: "18", Q: "Qu'est-ce que la sectorisation du réseau d'eau potable ?", R: "La sectorisation consiste à diviser le réseau de distribution d'eau en plusieurs sections (ou secteurs) plus petites. Chaque secteur est relié à un sous-ensemble de canalisations, réservoirs, pompes, et compteurs de manière à faciliter la gestion, la maintenance, et l'analyse de la consommation d'eau." },
];


  // Méthode pour basculer l'état du menu mobile
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }



  constructor(private sanitizer: DomSanitizer) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  // Fonction pour générer l'URL sûre
  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }openDocument(pdfUrl: string): void {
    window.open(pdfUrl, '_blank');
  }

  liens = [
    { id: "AIDE MEMO_MEC SOLS", title: "Aide-mémoire de Mécanique des Sols", desc: "Caractérisation des sols et des roches | Théorie du calcul à la rupture | Outils de dimensionnement des ouvrages", cat: "Mécanique des Sols",
    pdfUrl:"https://drive.google.com/file/d/11YemLXSVW1AY-4mOH0N6Z1gFmjGJapE5/view?usp=drive_link" },
    { id: "AIDE MEMO_OUVRAGES BA", title: "Aide-mémoire des Ouvrages en Béton Armé", desc: "Règles générales | Poteaux, Poutres, Planchers-dalles | Comportement au feu | Fondations, murs de soutènement", cat: "Béton Armé",
    pdfUrl:"https://drive.google.com/file/d/148_GnEYXSXq599UY8Qll6RiNonWcWlhh/view?usp=drive_link" },
    { id: "FICHES_TECHNIQUES CONSTR", title: "La Construction, comment ça marche ?", desc: "Toutes les techniques de construction en images | + de 6000 illustrations", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/14l8SHRyGewLVmzfnL3DynM3m_9yoqV9B/view?usp=drive_link" },
    { id: "GUIDE BLEU", title: "Guide Bleu", desc: "Guide pratique des techniques et ouvrages hydrauliques", cat: "Ouvrages hydrauliques",
    pdfUrl:"https://drive.google.com/file/d/10rEPC-7kh7uqB2D9SkkexCBpnXP-k2aO/view?usp=drive_link" },
    { id: "GUIDE_CONSTR BATI", title: "Guide de construction de bâtiment", desc: "Maîtriser l’ingénierie civile | Dessins techniques | Éléments de construction | Éléments de calcul | Formulaire", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/11Nv_314CCETf_BpUE3oZmks51fY2R-zJ/view?usp=drive_link" },
    { id: "GUIDE_PATHOLOGIE FACADES", title: "Pathologies des bâtiments : Façades", desc: "La fissuration des façades | Les désordres affectant le gros œuvre et les revêtements", cat: "Pathologie",
    pdfUrl:"https://drive.google.com/file/d/10WFJHoGoyAmhekkABUixCU2_AkHpkzzG/view?usp=drive_link" },
    { id: "GUIDE_PATHOLOGIE FONDATION", title: "Pathologies des bâtiments : Fondations superficielles", desc: "Diagnostic, réparations et prévention | Maisons individuelles et bâtiments assimilés", cat: "Pathologie",
    pdfUrl:"https://drive.google.com/file/d/13hF6IWxhz0gOtBu8AtZWCdaiPFEh6bLh/view?usp=drive_link" },
    { id: "GUIDE_PATHOLOGIE GENE", title: "Pathologie générale : Béton", desc: "Pathologie du béton | Pathologie des parois | Réhabilitation des bâtiments", cat: "Pathologie",
    pdfUrl:"https://drive.google.com/file/d/11ATfeoKpNcKV3-UwGNEHj6KGnqUkBsa3/view?usp=drive_link" },
    { id: "GUIDE_POMPAGE", title: "Installations de pompage d'eau", desc: "Guide technique | Pompage des eaux claires | Pompage des eaux chargées | Aspects énergétiques", cat: "Machine Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/14LPymFstvOy0h8V3LoFfoGPqkpRm1Ek7/view?usp=drive_link" },
    { id: "GUIDE_PROJET_BATIMENT", title: "Guide de projets bâtiment", desc: "Démarches d’étude | Formules et méthodes nécessaires", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/141N8yXX8ju_rIHcY2Zxp0eZbs9PuUPrn/view?usp=drive_link" },
    { id: "GUIDE_PROJET_HYD", title: "Guide de projets hydrauliques", desc: "Démarches d’étude | Formules et méthodes nécessaires", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/13gr4om862OQJD6hE_X2TjFNqB8owYyn6/view?usp=drive_link" },
    { id: "HENRI RENAUD_BATIMENT IMPL & BRANCH", title: "Construire sa maison : Implantations et branchements", desc: "Terrain de construction | Documents & permis de construire | Implantations & branchements", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/148srXcvYf1qA_PCU6iY8SRZ3r55KjLZk/view?usp=drive_link" },
    { id: "HENRI RENAUD_BATIMENT", title: "Constructeur bâtiment : Technologie", desc: "Dallages | Murs de façades | Maçonnerie | Linteaux et chaînages | Seuils | Escaliers", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/13iAlWxkMuhVigP3Dp5R95wSxfBsnMqjL/view?usp=drive_link" },
    { id: "HENRI RENAUD_CHARPENTES", title: "Construire sa maison : Charpentes & couvertures", desc: "Charpentes traditionnelles | Charpentes avec fermettes | Couvertures en tuiles", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/11RtIXh-bFE79i5fPExromxzm0ULkP0B6/view?usp=drive_link" },
    { id: "HENRI RENAUD_CHOIX SITE", title: "Construire sa maison : Choix du terrain & plans d'exécution", desc: "Terrains à bâtir | Documents graphiques | Plans d'exécution des ouvrages", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/14iCjDrstwsxg2EQNzDFqDnxfWl-IEyUp/view?usp=drive_link" },
    { id: "HENRI RENAUD_DESSINS", title: "Construire sa maison : Dessin technique & lecture de plan", desc: "Termes utilisés en bâtiment | Plans & coupes : cotation, conventions | Dessins de coffrage & ferraillage", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/1380Rec4ZN2i6BYUkdOKMRu4h0H3Vajxu/view?usp=drive_link" },
    { id: "HENRI RENAUD_FONDATIONS", title: "Construire sa maison : Fondations", desc: "Charges permanentes & d'exploitations | Ciments courants & bétons de structure | Dimensionnement des semelles | Dispositions constructives", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/1-f3l4bt1yj_Wk6sZhMQuJuigoUn0Yj15/view?usp=drive_link" },
    { id: "HENRI RENAUD_GUIDE BA", title: "Béton Armé : Guide de calcul", desc: "Calcul aux états limites | Formulaire des poutres | Calcul des sollicitations | Micro-projet bâtiment", cat: "Béton Armé",
    pdfUrl:"https://drive.google.com/file/d/15EIjdnJEynZs_KPjtlWebyjeM1rdI81O/view?usp=drive_link" },
    { id: "HENRI RENAUD_OUVRAGES BA", title: "Ouvrages en Béton Armé", desc: "Technologie du bâtiment | Gros œuvre", cat: "Béton Armé",
    pdfUrl:"https://drive.google.com/file/d/12v9zzYQx3FsmynyzKC5bkyIH9bUnoAFT/view?usp=drive_link" },
    { id: "HYD GENE", title: "Hydraulique Générale : Hydrostatique & Hydraulique en charge", desc: "Caractéristiques des écoulements | Hydrostatique | Hydraulique en charge", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/155i7MGLXLxsREKmc3GqFuROapN5qrqNr/view?usp=drive_link" },
    { id: "HYD_GR", title: "Hydraulique pour le génie rural", desc: "Principes généraux d’hydraulique | Hydraulique en charge | Pompage | Hydraulique à surface libre", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/1-jK3zHLFPqxFfVLljG5lkBoJEjGUrGDl/view?usp=drive_link" },
    { id: "HYD_ING", title: "Hydraulique pour le technicien et l'ingénieur", desc: "Hydrostatique | Les équations de l'hydraulique | Hydraulique en charge | Hydraulique à surface libre", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/13w-GFiWBWHVJhQcaeNzA34wWgJ41GUct/view?usp=drive_link" },
    { id: "LENCASTRE_HYD GENE", title: "Hydraulique Générale : Tout en un", desc: "Propriétés des fluides | Bases théoriques | Mesures hydrauliques | Pompes | Écoulement en charge | Écoulement à surface libre", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/10LIhmdB_oLiDeNkgYR0YEYGzk1eZwQVf/view?usp=drive_link" },
    { id: "ONEP_AIDE MEMO_1", title: "ONEP : Aide-mémoire", desc: "Conduites | Normes ONEP | Fuites d'eaux | Pompage | Comptage | Maintenance | Assainissement | Environnement", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/102e_sw5iWE740L3rRZVhg_oGIpqSsxqG/view?usp=drive_link" },
    { id: "MAITRISE_PERTES_EAUX", title: "Connaissance et maîtrise des pertes dans les réseaux d’eau potable", desc: "Les objectifs de la distribution d’eau | Notions de base et outils | Méthodologie et mise en œuvre", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/1-I1HYvbgSWODitLU19T05w8pElTnlTgR/view?usp=drive_link" },
    { id: "NOTIONS_MEC_FLUIDES", title: "Notions de Mécanique des fluides", desc: "Cours & Exercices Corrigés", cat: "Hydraulique",
    pdfUrl:"https://drive.google.com/file/d/1-TNJC4DedVtZsUf-12piCus7a83UcSXw/view?usp=drive_link" },
    { id: "GUIDE_GTR_MAROC", title: "Guide de terrassement routier GTR", desc: "Réalisation des remblais et des couches de forme", cat: "Terrassement",
    pdfUrl:"https://drive.google.com/file/d/14tHnRflJNR1zybI7CTRAH9UitpzMzJcP/view?usp=drive_link" },
    { id: "REG_RPS", title: "Règlement de construction parasismique marocain", desc: "RPS 2000-Version 2011", cat: "RPS",
    pdfUrl:"https://drive.google.com/file/d/15GsAkMoQ1IGBlkDQOFMpVifWmgw-Lb-d/view?usp=drive_link" },
    { id: "REG_RPS_RES", title: "Résumé du règlement de construction parasismique marocain", desc: "RPS 2000-Version 2011", cat: "RPS",
    pdfUrl:"https://drive.google.com/file/d/15AMZpXwTapb-jhbnwRNzHSkD4UDRF1fR/view?usp=drive_link" },
    { id: "GUIDE_EURO_CM_POTEAU", title: "Guide Eurocode  : Assemblages des pieds de poteaux en acier", desc: "Dimensionnement des assemblages de pieds de poteaux métalliques encastrés et articulés", cat: "Eurocode",
    pdfUrl:"https://drive.google.com/file/d/14qKUiuOSQgVmeJgoRAeonIjCxUF4xbed/view?usp=drive_link" },
    { id: "GUIDE_CSTB_COUVERTURE", title: "Guide Technique  : Guide de couvertures en climat de montagne", desc: "Guide de conception | Guide de réalisation", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/11MtWFeKtZAgFHU3JXwhF_T-1hy0ZNlhO/view?usp=drive_link" },
    { id: "GUIDE_EURO_MACONNERIE", title: "Guide Eurocode  : Dimensionnement des murs en maçonnerie", desc: "Dimensionnement vis-à-vis des actions agissant dans le plan des murs et des actions normales au plan des murs", cat: "Eurocode",
    pdfUrl:"https://drive.google.com/file/d/10L2f1LWKXcl5WBc0dtSs9bKzn55rVtV8/view?usp=drive_link" },
    { id: "NORME_CLASS_EXPOSITION", title: "Les classes d'exposition : Aide & prescription", desc: "Classes d'exposition des ouvrages en Béton Armé", cat: "Normes",
    pdfUrl:"https://drive.google.com/file/d/1-CiyUjti4okBa8OgRCqOCPzWpMBCN6C0/view?usp=drive_link" },
    { id: "CATALOGUE_CHAUSSEE", title: "Catalogue des structures de chaussée neuve", desc: "type de structure | dimensionnement relatif des couches", cat: "Route",
    pdfUrl:"https://drive.google.com/file/d/1-mmP750fG1WEXcPkcZWD4xH9z4IvIQTd/view?usp=drive_link" },
    { id: "NOTE_PISCINE", title: "NOTE DE CALCUL D’UNE PISCINE", desc: "Conception & Dimensionnement", cat: "Note",
    pdfUrl:"https://drive.google.com/file/d/113zTY0EOC8FYKULDEtTljxq6AmDeNsda/view?usp=drive_link" },
    { id: "HYDRO_INFO", title: "Computer Applications in Hydraulic Engineering", desc: "Computer Applications Hydraulic Engineering, 9th Edition", cat: "Hydroinfo" ,
    pdfUrl:"https://drive.google.com/file/d/14_xigrofdHlARXJVX1scGjqI4NSKNL6G/view?usp=drive_link"},
    { id: "DIM_RESEAU_IRR", title: "Dimensionnement des ouvrages du rèseau d'irrigation", desc: "Determination des pertes de charge | Dimensionnement des ouvrages", cat: "Irrigation" ,
    pdfUrl:"https://drive.google.com/file/d/12b0DIpdoK8uqrTI_X-uIRMJNtz4ZZR9T/view?usp=drive_link"},
    { id: "DIM_CAN_IRR", title: "Dimensionnement des canneaux d'irrigation", desc: "Conception & Dimensionnement", cat: "Irrigation",
    pdfUrl:"https://drive.google.com/file/d/14LBm9YufEFHo0Qtmfq7UAKCbQF4616oG/view?usp=drive_link" },
    { id: "NOTE_AEP", title: "Alimentation en eau potable", desc: "Calcul & Dimensionnement", cat: "Note",
    pdfUrl:"https://drive.google.com/file/d/1-pq7ePEHeCuJAGYgJa5e-wEwKCaC9z8s/view?usp=drive_link" },
    { id: "NOTE_AEP_2", title: "Mini-Projet : Calcul d’un réseau d’eau potable", desc: "Calcul, Conception & Dimensionnement", cat: "Note",
    pdfUrl:"https://drive.google.com/file/d/12D8NJV3IZ7nGctarnm_6sCeRcn1gbP9t/view?usp=drive_link" },
    { id: "TECH_IRR_SURFACE", title: "COURS DE TECHNIQUES D'IRRIGATION DE SURFACE OU D'IRRIGATION GRAVITAIRE A LA PARCELLE", desc: "Maitriser les techniques de l'irrigation gravitaire", cat: "Irrigation",
    pdfUrl:"https://drive.google.com/file/d/10a8S2Wdx6JDe5T_9lnR8KLa3Sr4anAok/view?usp=drive_link" },
    { id: "GUIDE_IRR_CAN", title: "Réseaux de canaux", desc: "Conception & Normes", cat: "Irrigation",
    pdfUrl:"https://drive.google.com/file/d/10dCJJ_W1mH16nii3nXx_L4MPaiWoYOVR/view?usp=drive_link" },
    { id: "COURS_GENIE_CIVIL", title: "GENIE CIVIL : Tout en un", desc: "Ecole Centrale Paris, Réservé aux Enseignants, Elèves et Anciens Elèves", cat: "Construction",
    pdfUrl:"https://drive.google.com/file/d/15GzoRxIeqKAgt86VO-cwlW8NIsiuBPOf/view?usp=drive_link" },
    { id: "QCM_ROUTE_1", title: "QCM : Routes", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/16CRzunIHci_7Jzs0USB1g1ciG4wOcQKP/view?usp=drive_link"},
    { id: "QCM_SOL_1", title: "QCM : Mécanique des sols", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/16BTpVwhgcatZSRxeWYb6GfqR8mjlKGV6/view?usp=drive_link" },
    { id: "QCM_HYDROLO_1", title: "QCM : Hydrogéologie", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15zHoobZPSYlidvudugm6LMe40wSmY5Lf/view?usp=drive_link" },
    { id: "QCM_HYD_1", title: "QCM : Aménagements hydrauliques", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15xdNJkQQwwZxbVjsNlD-in2bjxd1pe_o/view?usp=drive_link" },
    { id: "QCM_FLUIDE_1", title: "QCM : Mécanique des fluides", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15lqD2mgL8x4sdpDRv8hvggs5oeX7uLUf/view?usp=drive_link" },
    { id: "QCM_CIVIL_2", title: "QCM : Génie Civil", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15ediObNfGojhnz-F_eYFz6ZK5FBpUaRB/view?usp=drive_link" },
    { id: "QCM_BAT_1", title: "QCM : Batiment & Construction", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15ckIaJ53pwDhEOD8L43axKXZcCbG5QUQ/view?usp=drive_link" },
    { id: "QCM_BA_1", title: "QCM : Béton Armé", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15YCPOgmxTXlqkt-h2RAKVy0dOXgk6Ud1/view?usp=drive_link" },
    { id: "QCM_ASS_1", title: "QCM : Assainissement", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15OoX-C-KvvnQ1Oyx3m5v6gRRrE9c1D-n/view?usp=drive_link" },
    { id: "QCM_CIVIL_1", title: "QCM : Génie Civil", desc: "Questions | Reponses", cat: "QCMs",
    pdfUrl:"https://drive.google.com/file/d/15L2DllUZc2FCgzOe_L1UCz7YeozwoOl_/view?usp=drive_link" },
    { id: "", title: "", desc: "", cat: "",
    pdfUrl:"" },



];




categories =[
  {cat:"Hydraulique"},
  {cat:"Béton Armé"},
  {cat:"Mécanique des Sols"},
  {cat:"Construction"},
  {cat:"Pathologie"},
  {cat:"Machine Hydraulique"},
  {cat:"Ouvrages hydrauliques"},
  {cat:"RPS"},
  {cat:"Terrassement"},
  {cat:"Note"},
  {cat:"Eurocode"},
  {cat:"Normes"},
  {cat:"Route"},
  {cat:"Hydroinfo"},
  {cat:"Irrigation"},
  {cat:"QCMs"}
]


selectedCategory: string = '';
filteredItems = this.liens;

// Fonction pour sélectionner une catégorie et filtrer les éléments
selectCategory(category: string) {
  this.selectedCategory = category;
  // Filtrer les items selon la catégorie sélectionnée
  this.filteredItems = this.liens.filter(lien => lien.cat === category);
}





}
