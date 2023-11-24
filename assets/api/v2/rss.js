const request = require('request');
const RssParser = require('rss-parser');
const stringSimilarity = require("string-similarity");

const service = require("./service");
const findISSN = require("../find-issn.js")
const tfidf = require("../TF-IDF.js")
const jifIndex = require("../JIF-index.js")
const util = require("./util.js")


const ORGANIZER = {
    AAAS: {
        name: "American Association for the Advancement of Science",
        image: "assets/images/AAAS-logo.png",
    },
    APS: {
        name: "American Physical Society",
        image: "assets/images/APS-Phy-logo.png",
    },
    AIP: {
        name: "American Institute of Physics",
        image: "assets/images/AIP-logo.png",
    },
    ASCE: {
        name: "American Society of Civil Engineers",
        image: "assets/images/ASCE-logo.png",
    },
    APA: {
        name: "American Psychological Association",
        image: "assets/images/APA-logo.png",
    },
    Forbes: {
        name: "Forbes",
        image: "assets/images/Forbes-logo.png",
    },
    Nature: {
        name: "Nature",
        image: "assets/images/Nature-logo.png",
    },
    Wiley: {
        name: "Wiley",
        image: "assets/images/Wiley-logo.png",
    },
    TheLancet: {
        name: "The Lancet",
        image: "assets/images/The-lancet-logo.png",
    },
    NEJM: {
        name: "New England Journal of Medicine",
        image: "assets/images/NEJM-logo.png",
    },
    CellPress: {
        name: "Cell Press",
        image: "assets/images/cell-press-logo.png",
    },
    CambridgeCore: {
        name: "Cambridge Core",
        image: "assets/images/Cambridge-Core-logo.png",
    },
    Optica: {
        name: "Optica",
        image: "assets/images/Optica-logo.png",
    },
    AmericanChemicalSociety: {
        name: "American Chemical Society",
        image: "assets/images/American_Chemical_Society_logo.svg.png",
    },
    ArXivOrg: {
        name: "arXiv.org",
        image: "assets/images/arXiv-logo.jpeg",
    },
}

const ENDPOINT = {
    // AAAS
    ScienceMagazineFeeds: {
        name: "Science Magazine Feeds",
        url: "https://www.omnycontent.com/d/playlist/e763ee7a-311f-4004-8c05-ad8a0018d51b/68fe80a5-856c-4341-9f13-ada1016db982/dddf1674-4d7d-4aaf-a7f9-ada1016db98c/podcast.rss",
        organizer: ORGANIZER.AAAS
    },
    ScienceDailyNewsFeed: {
        name: "Science Daily News Feed",
        url: "https://www.science.org/rss/news_current.xml",
        organizer: ORGANIZER.AAAS
    },
    ScienceSignalingFeeds: {
        name: "Science Signaling Feeds",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=signaling",
        organizer: ORGANIZER.AAAS
    },
    ScienceTranslationalMedicineFeed: {
        name: "Science Translational Medicine Feed",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=stm",
        organizer: ORGANIZER.AAAS
    },
    ScienceAdvancesFeed: {
        name: "Science Advances Feed",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=sciadv",
        organizer: ORGANIZER.AAAS,
    },
    ScienceImmunologyFeed: {
        name: "Science Immunology Feed",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=sciimmunol",
        organizer: ORGANIZER.AAAS
    },
    ScienceRoboticsFeed: {
        name: "Science Robotics Feed",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=scirobotics",
        organizer: ORGANIZER.AAAS
    },
    Science: {
        name: "Science",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
        organizer: ORGANIZER.AAAS
    },
    // APS
    AdvancesInAtomicMolecularAndOpticalPhysics: {
        name: "Advances in Atomic, Molecular, and Optical Physics",
        url: "http://feeds.aps.org/rss/tocsec/PRL-AtomicMolecularandOpticalPhysics.xml",
        organizer: ORGANIZER.APS
    },
    CondensedMatterElectronicPropertiesEtc: {
        name: "Condensed Matter: Electronic Properties, etc.",
        url: "http://feeds.aps.org/rss/tocsec/PRL-CondensedMatterElectronicPropertiesetc.xml",
        organizer: ORGANIZER.APS
    },
    CondensedMatterStructureEtc: {
        name: "Condensed Matter: Structure, etc.",
        url: "http://feeds.aps.org/rss/tocsec/PRL-CondensedMatterStructureetc.xml",
        organizer: ORGANIZER.APS
    },
    ElementaryParticlesAndFields: {
        name: "Elementary Particles and Fields",
        url: "http://feeds.aps.org/rss/tocsec/PRL-ElementaryParticlesandFields.xml",
        organizer: ORGANIZER.APS
    },
    GeneralPhysicsStatisticalAndQuantumMechanicsQuantumInformationEtc: {
        name: "General Physics: Statistical and Quantum Mechanics, Quantum Information, etc.",
        url: "http://feeds.aps.org/rss/tocsec/PRL-GeneralPhysicsStatisticalandQuantumMechanicsQuantumInformationetc.xml",
        organizer: ORGANIZER.APS
    },
    GravitationAndAstrophysics: {
        name: "Gravitation and Astrophysics",
        url: "http://feeds.aps.org/rss/tocsec/PRL-GravitationandAstrophysics.xml",
        organizer: ORGANIZER.APS
    },
    NonlinearDynamicsFluidDynamicsClassicalOpticsEtc: {
        name: "Nonlinear Dynamics, Fluid Dynamics, Classical Optics, etc.",
        url: "http://feeds.aps.org/rss/tocsec/PRL-NonlinearDynamicsFluidDynamicsClassicalOpticsetc.xml",
        organizer: ORGANIZER.APS
    },
    NuclearPhysics: {
        name: "Nuclear Physics",
        url: "http://feeds.aps.org/rss/tocsec/PRL-NuclearPhysics.xml",
        organizer: ORGANIZER.APS
    },
    PlasmaAndBeamPhysics: {
        name: "Plasma and Beam Physics",
        url: "http://feeds.aps.org/rss/tocsec/PRL-PlasmaandBeamPhysics.xml",
        organizer: ORGANIZER.APS
    },
    SoftMatterBiologicalAndInterdisciplinaryPhysics: {
        name: "Soft Matter, Biological and Interdisciplinary Physics",
        url: "http://feeds.aps.org/rss/tocsec/PRL-SoftMatterBiologicalandInterdisciplinaryPhysics.xml",
        organizer: ORGANIZER.APS
    },
    PhysicalReviewApplied: {
        name: "Physical Review Applied",
        url: "http://feeds.aps.org/rss/recent/prapplied.xml",
        organizer: ORGANIZER.APS
    },
    // AIP
    AppliedPhysicsLetters: {
        name: "Applied Physics Letters",
        url: "https://pubs.aip.org/rss/site_1000017/1000011.xml",
        organizer: ORGANIZER.AIP
    },
    CHAOS: {
        name: "CHAOS",
        url: "https://aipp.silverchair.com/rss/site_1000025/1000015.xml",
        organizer: ORGANIZER.AIP
    },
    JournalOfAppliedPhysics: {
        name: "Journal of Applied Physics",
        url: "https://aipp.silverchair.com/rss/site_1000029/1000017.xml",
        organizer: ORGANIZER.AIP
    },
    Biomicrofluidics: {
        name: "Biomicrofluidics",
        url: "https://aipp.silverchair.com/rss/site_1000021/1000013.xml",
        organizer: ORGANIZER.AIP
    },
    JournalOfMathematicalPhysics: {
        name: "Journal of Mathematical Physics",
        url: "https://aipp.silverchair.com/rss/site_1000031/1000018.xml",
        organizer: ORGANIZER.AIP
    },
    JournalOfRenewableAndSustainableEnergy: {
        name: "Journal of Renewable and Sustainable Energy",
        url: "https://aipp.silverchair.com/rss/site_1000033/1000019.xml",
        organizer: ORGANIZER.AIP
    },
    LowTemperaturePhysics: {
        name: "Low Temperature Physics",
        url: "https://pubs.aip.org/rss/site_1000035/1000020.xml",
        organizer: ORGANIZER.AIP
    },
    PhysicsOfFluids: {
        name: "Physics of Fluids",
        url: "https://aipp.silverchair.com/rss/site_1000037/1000021.xml",
        organizer: ORGANIZER.AIP
    },
    PhysicsOfPlasmas: {
        name: "Physics of Plasmas",
        url: "https://aipp.silverchair.com/rss/site_1000039/1000022.xml",
        organizer: ORGANIZER.AIP
    },
    ReviewOfScientificInstruments: {
        name: "Review of Scientific Instruments",
        url: "https://pubs.aip.org/rss/site_1000041/1000023.xml",
        organizer: ORGANIZER.AIP
    },
    JournalOfChemicalPhysics: {
        name: "Journal of Chemical Physics",
        url: "https://aipp.silverchair.com/rss/site_1000043/1000024.xml",
        organizer: ORGANIZER.AIP
    },
    APLPhotonics: {
        name: "APL Photonics",
        url: "https://pubs.aip.org/rss/site_1000015/1000010.xml",
        organizer: ORGANIZER.AIP
    },
    // ASCE
    JournalOfAerospaceEngineering: {
        name: "Journal of Aerospace Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jaeeez",
        organizer: ORGANIZER.ASCE
    },
    JournalOfArchitecturalEngineering: {
        name: "Journal of Architectural Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jaeied",
        organizer: ORGANIZER.ASCE
    },
    JournalOfBridgeEngineering: {
        name: "Journal of Bridge Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jbenf2",
        organizer: ORGANIZER.ASCE
    },
    JournalOfCivilEngineeringEducation: {
        name: "Journal of Civil Engineering Education",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jceecd",
        organizer: ORGANIZER.ASCE
    },
    JournalOfColdRegionsEngineering: {
        name: "Journal of Cold Regions Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jcrgei",
        organizer: ORGANIZER.ASCE
    },
    JournalOfCompositesForConstruction: {
        name: "Journal of Composites for Construction",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jccof2",
        organizer: ORGANIZER.ASCE
    },
    JournalOfComputingInCivilEngineering: {
        name: "Journal of Computing in Civil Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jccee5",
        organizer: ORGANIZER.ASCE
    },
    JournalOfConstructionEngineeringAndManagement: {
        name: "Journal of Construction Engineering and Management",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jcemd4",
        organizer: ORGANIZER.ASCE
    },
    JournalOfEnergyEngineering: {
        name: "Journal of Energy Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jleed9",
        organizer: ORGANIZER.ASCE
    },
    JournalOfEngineeringMechanics: {
        name: "Journal of Engineering Mechanics",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jenmdt",
        organizer: ORGANIZER.ASCE
    },
    JournalOfEnvironmentalEngineering: {
        name: "Journal of Environmental Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=joeedu",
        organizer: ORGANIZER.ASCE
    },
    JournalOfGeotechnicalAndGeoenvironmentalEngineering: {
        name: "Journal of Geotechnical and Geoenvironmental Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jggefk",
        organizer: ORGANIZER.ASCE
    },
    JournalOfHazardousToxicAndRadioactiveWaste: {
        name: "Journal of Hazardous, Toxic, and Radioactive Waste",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhtrbp",
        organizer: ORGANIZER.ASCE
    },
    JournalOfHighwayAndTransportationResearchAndDevelopmentEnglishEdition: {
        name: "Journal of Highway and Transportation Research and Development (English Edition)",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhtrcq",
        organizer: ORGANIZER.ASCE
    },
    JournalOfHydraulicEngineering: {
        name: "Journal of Hydraulic Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhend8",
        organizer: ORGANIZER.ASCE
    },
    JournalOfHydrologicEngineering: {
        name: "Journal of Hydrologic Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhyeff",
        organizer: ORGANIZER.ASCE
    },
    JournalOfInfrastructureSystems: {
        name: "Journal of Infrastructure Systems",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jitse4",
        organizer: ORGANIZER.ASCE
    },
    JournalOfIrrigationAndDrainageEngineering: {
        name: "Journal of Irrigation and Drainage Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jidedh",
        organizer: ORGANIZER.ASCE
    },
    JournalOfLegalAffairsAndDisputeResolutionInEngineeringAndConstruction: {
        name: "Journal of Legal Affairs and Dispute Resolution in Engineering and Construction",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jladah",
        organizer: ORGANIZER.ASCE
    },
    JournalOfManagementInEngineering: {
        name: "Journal of Management in Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jmenea",
        organizer: ORGANIZER.ASCE
    },
    JournalOfMaterialsInCivilEngineering: {
        name: "Journal of Materials in Civil Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jmcee7",
        organizer: ORGANIZER.ASCE
    },
    JournalOfPerformanceOfConstructedFacilities: {
        name: "Journal of Performance of Constructed Facilities",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jpcfev",
        organizer: ORGANIZER.ASCE
    },
    JournalOfPipelineSystemsEngineeringAndPractice: {
        name: "Journal of Pipeline Systems Engineering and Practice",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jpsea2",
        organizer: ORGANIZER.ASCE
    },
    JournalOfStructuralEngineering: {
        name: "Journal of Structural Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jsendh",
        organizer: ORGANIZER.ASCE
    },
    JournalOfSurveyingEngineering: {
        name: "Journal of Surveying Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jsued2",
        organizer: ORGANIZER.ASCE
    },
    JournalOfSustainableWaterInTheBuiltEnvironment: {
        name: "Journal of Sustainable Water in the Built Environment",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jswbay",
        organizer: ORGANIZER.ASCE
    },
    JournalOfTransportationEngineeringPartASystems: {
        name: "Journal of Transportation Engineering Part A: Systems",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jtepbs",
        organizer: ORGANIZER.ASCE
    },
    JournalOfTransportationEngineeringPartBPavements: {
        name: "Journal of Transportation Engineering Part B: Pavements",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jpeodx",
        organizer: ORGANIZER.ASCE
    },
    JournalOfUrbanPlanningAndDevelopment: {
        name: "Journal of Urban Planning and Development",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jupddm",
        organizer: ORGANIZER.ASCE
    },
    JournalOfWaterResourcesPlanningAndManagement: {
        name: "Journal of Water Resources Planning and Management",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jwrmd5",
        organizer: ORGANIZER.ASCE
    },
    JournalOfWaterwayPortCoastalAndOceanEngineering: {
        name: "Journal of Waterway, Port, Coastal, and Ocean Engineering",
        url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jwped5",
        organizer: ORGANIZER.ASCE
    },
    // APA
    AmericanJournalOfOrthopsychiatry: {
        name: "American Journal of Orthopsychiatry",
        url: "http://content.apa.org/journals/ort.rss?_ga=2.133941900.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    AmericanPsychologist: {
        name: "American Psychologist",
        url: "http://content.apa.org/journals/amp.rss?_ga=2.157592504.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    ArchivesOfScientificPsychology: {
        name: "Archives of Scientific Psychology",
        url: "http://content.apa.org/journals/arc.rss?_ga=2.192660264.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    AsianAmericanJournalOfPsychology: {
        name: "Asian American Journal of Psychology",
        url: "http://content.apa.org/journals/aap.rss?_ga=2.94946206.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    BehaviorAnalysis: {
        name: "Behavior Analysis",
        url: "http://content.apa.org/journals/bar.rss?_ga=2.94677790.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    BehavioralDevelopmentBulletin: {
        name: "Behavioral Development Bulletin",
        url: "http://content.apa.org/journals/bdb.rss?_ga=2.94677790.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    BehavioralNeuroscience: {
        name: "Behavioral Neuroscience",
        url: "http://content.apa.org/journals/bne.rss?_ga=2.99206940.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    CanadianJournalOfBehaviouralScience: {
        name: "Canadian Journal of Behavioural Science",
        url: "http://content.apa.org/journals/cbs.rss?_ga=2.99206940.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    CanadianJournalOfExperimentalPsychology: {
        name: "Canadian Journal of Experimental Psychology",
        url: "http://content.apa.org/journals/cep.rss?_ga=2.99206940.340304673.1668267804-1514980598.1668267803",
        organizer: ORGANIZER.APA
    },
    // Forbes
    ForbesScience: {
        name: "Forbes - Science",
        url: "https://www.forbes.com/science/feed2",
        organizer: ORGANIZER.Forbes
    },
    ForbesMoney: {
        name: "Forbes - Money",
        url: "https://www.forbes.com/money/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesBusiness: {
        name: "Forbes - Business",
        url: "https://www.forbes.com/business/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesSmallBusiness: {
        name: "Forbes - Small Business",
        url: "https://www.forbes.com/small-business/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesBillionaires: {
        name: "Forbes - Billionaires",
        url: "https://www.forbes.com/worlds-billionaires/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesInnovation: {
        name: "Forbes - Innovation",
        url: "https://www.forbes.com/innovation/feed2",
        organizer: ORGANIZER.Forbes
    },
    ForbesLeadership: {
        name: "Forbes - Leadership",
        url: "https://www.forbes.com/leadership/feed2/",
        organizer: ORGANIZER.Forbes
    },
    ForbesLifestyle: {
        name: "Forbes - Lifestyle",
        url: "https://www.forbes.com/lifestyle/feed",
        organizer: ORGANIZER.Forbes
    },
    ForbesRealEstate: {
        name: "Forbes - Real Estate",
        url: "https://www.forbes.com/real-estate/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesGames: {
        name: "Forbes - Games",
        url: "https://www.forbes.com/games/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesMarkets: {
        name: "Forbes - Markets",
        url: "https://www.forbes.com/markets/feed/",
        organizer: ORGANIZER.Forbes
    },
    ForbesInvesting: {
        name: "Forbes - Investing",
        url: "https://www.forbes.com/investing/feed/",
        organizer: ORGANIZER.Forbes
    },
    // Nature
    NatureCommunications: {
        name: "Nature Communications",
        url: "https://www.nature.com/ncomms.rss",
        organizer: ORGANIZER.Nature
    },
    NatureMaterials: {
        name: "Nature Materials",
        url: "https://www.nature.com/nmat.rss",
        organizer: ORGANIZER.Nature
    },
    NatureNanotechnology: {
        name: "Nature Nanotechnology",
        url: "https://www.nature.com/nnano.rss",
        organizer: ORGANIZER.Nature
    },
    Nature: {
        name: "Nature",
        url: "https://www.nature.com/nature.rss",
        organizer: ORGANIZER.Nature
    },
    NaturePhotonics: {
        name: "Nature Photonics",
        url: "https://www.nature.com/nphoton.rss",
        organizer: ORGANIZER.Nature
    },
    LightScienceAndApplications: {
        name: "Light: Science & Applications",
        url: "https://www.nature.com/lsa.rss",
        organizer: ORGANIZER.Nature
    },
    NaturePhysics: {
        name: "Nature Physics",
        url: "https://www.nature.com/nphys.rss",
        organizer: ORGANIZER.Nature
    },
    // Wiley
    AdvancedMaterials: {
        name: "Advanced Materials",
        url: "https://onlinelibrary.wiley.com/feed/15214095/most-recent",
        organizer: ORGANIZER.Wiley
    },
    WIREsNanomedicineAndNanobiotechnology: {
        name: "WIREs Nanomedicine and Nanobiotechnology",
        url: "https://wires.onlinelibrary.wiley.com/action/showFeed?jc=19390041&type=etoc&feed=rss",
        organizer: ORGANIZER.Wiley
    },
    TheJournalOfFinance: {
        name: "The Journal of Finance",
        url: "https://onlinelibrary.wiley.com/feed/15406261/most-recent",
        organizer: ORGANIZER.Wiley
    },
    GeophysicalResearchLetters: {
        name: "Geophysical Research Letters",
        url: "https://agupubs.onlinelibrary.wiley.com/feed/19448007/most-recent",
        organizer: ORGANIZER.Wiley
    },
    ThePlantJournal: {
        name: "The Plant Journal",
        url: "https://onlinelibrary.wiley.com/action/showFeed?jc=1365313x&type=etoc&feed=rss",
        organizer: ORGANIZER.Wiley
    },
    GlobalChangeBiology: {
        name: "Global Change Biology",
        url: "https://onlinelibrary.wiley.com/action/showFeed?jc=13652486&type=etoc&feed=rss",
        organizer: ORGANIZER.Wiley
    },
    ChemistrySelect: {
        name: "ChemistrySelect",
        url: "https://chemistry-europe.onlinelibrary.wiley.com/feed/23656549/most-recent",
        organizer: ORGANIZER.Wiley
    },
    ComputerAidedCivilAndInfrastructureEngineering: {
        name: "Computer-Aided Civil and Infrastructure Engineering",
        url: "https://onlinelibrary.wiley.com/feed/14678667/most-recent",
        organizer: ORGANIZER.Wiley
    },
    FatigueAndFractureOfEngineeringMaterialsAndStructures: {
        name: "Fatigue & Fracture of Engineering Materials & Structures",
        url: "https://onlinelibrary.wiley.com/feed/14602695/most-recent",
        organizer: ORGANIZER.Wiley
    },
    TheCanadianJournalOfChemicalEngineering: {
        name: "The Canadian Journal of Chemical Engineering",
        url: "https://onlinelibrary.wiley.com/feed/1939019x/most-recent",
        organizer: ORGANIZER.Wiley
    },
    InternationalJournalForNumericalMethodsInBiomedicalEngineering: {
        name: "International Journal for Numerical Methods in Biomedical Engineering",
        url: "https://onlinelibrary.wiley.com/feed/20407947/most-recent",
        organizer: ORGANIZER.Wiley
    },
    JournalOfFoodProcessEngineering: {
        name: "Journal of Food Process Engineering",
        url: "https://onlinelibrary.wiley.com/feed/17454530/most-recent",
        organizer: ORGANIZER.Wiley
    },
    ProteinScience: {
        name: "Protein Science",
        url: "https://onlinelibrary.wiley.com/feed/1469896x/most-recent",
        organizer: ORGANIZER.Wiley
    },
    EnvironmentalToxicologyAndChemistry: {
        name: "Environmental Toxicology and Chemistry",
        url: "https://setac.onlinelibrary.wiley.com/feed/15528618/most-recent",
        organizer: ORGANIZER.Wiley
    },
    BiologicalReviews: {
        name: "Biological Reviews",
        url: "https://onlinelibrary.wiley.com/feed/1469185x/most-recent",
        organizer: ORGANIZER.Wiley
    },
    MedicalEducation: {
        name: "Medical Education",
        url: "https://onlinelibrary.wiley.com/feed/13652923/most-recent",
        organizer: ORGANIZER.Wiley
    },
    CACancerJournalForClinician: {
        name: "CA: A Cancer Journal for Clinicians",
        url: "https://acsjournals.onlinelibrary.wiley.com/feed/15424863/most-recent",
        organizer: ORGANIZER.Wiley
    },
    AdvancedScience: {
        name: "Advanced Science",
        url: "https://onlinelibrary.wiley.com/feed/21983844/most-recent",
        organizer: ORGANIZER.Wiley
    },
    LaserAndPhotonicsReviews: {
        name: "Laser & Photonics Reviews",
        url: "https://onlinelibrary.wiley.com/feed/18638899/most-recent",
        organizer: ORGANIZER.Wiley
    },
    // TheLancet
    TheLancet: {
        name: "The Lancet",
        url: "https://www.thelancet.com/rssfeed/lancet_current.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetPublicHealth: {
        name: "The Lancet Public Health",
        url: "https://www.thelancet.com/rssfeed/lanpub_online.xmll",
        organizer: ORGANIZER.TheLancet
    },
    LancetOncology: {
        name: "Lancet Oncology",
        url: "https://www.thelancet.com/rssfeed/lanonc_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    EBioMedicine: {
        name: "eBioMedicine",
        url: "https://www.thelancet.com/rssfeed/ebiom_current.xml",
        organizer: ORGANIZER.TheLancet
    },
    EClinicalMedicine: {
        name: "EClinicalMedicine",
        url: "https://www.thelancet.com/rssfeed/eclinm_current.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetChildAndAdolescentHealth: {
        name: "The Lancet Child & Adolescent Health",
        url: "https://www.thelancet.com/rssfeed/lanchi_current.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetDiabetesAndEndocrinology: {
        name: "The Lancet Diabetes & Endocrinology",
        url: "https://www.thelancet.com/rssfeed/landia_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetDigitalHealth: {
        name: "The Lancet Digital Health",
        url: "https://www.thelancet.com/rssfeed/landig_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetGastroenterologyAndHepatology: {
        name: "The Lancet Gastroenterology & Hepatology",
        url: "https://www.thelancet.com/rssfeed/langas_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetGlobalHealth: {
        name: "The Lancet Global Health",
        url: "https://www.thelancet.com/rssfeed/langlo_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetHaematology: {
        name: "The Lancet Haematology",
        url: "https://www.thelancet.com/rssfeed/lanhae_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetHIV: {
        name: "The Lancet HIV",
        url: "https://www.thelancet.com/rssfeed/lanhiv_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetInfectiousDiseases: {
        name: "The Lancet Infectious Diseases",
        url: "https://www.thelancet.com/rssfeed/laninf_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetNeurology: {
        name: "The Lancet Neurology",
        url: "https://www.thelancet.com/rssfeed/laneur_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetMicrobe: {
        name: "The Lancet Microbe",
        url: "https://www.thelancet.com/rssfeed/lanmic_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetPlanetaryHealth: {
        name: "The Lancet Planetary Health",
        url: "https://www.thelancet.com/rssfeed/lanplh_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetPsychiatry: {
        name: "The Lancet Psychiatry",
        url: "https://www.thelancet.com/rssfeed/lanpsy_current.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetRespiratoryMedicine: {
        name: "The Lancet Respiratory Medicine",
        url: "https://www.thelancet.com/rssfeed/lanres_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetRheumatology: {
        name: "The Lancet Rheumatology",
        url: "https://www.thelancet.com/rssfeed/lanrhe_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    TheLancetRegionalHealthWesternPacific: {
        name: "The Lancet Regional Health - Western Pacific",
        url: "https://www.thelancet.com/rssfeed/lanwpc_online.xml",
        organizer: ORGANIZER.TheLancet
    },
    // NEJM
    NEJM: {
        name: "New England Journal of Medicine",
        url: "https://www.nejm.org/action/showFeed?jc=nejm&type=etoc&feed=rss",
        organizer: ORGANIZER.NEJM
    },
    // Cell Press
    Cell: {
        name: "Cell",
        url: "https://www.cell.com/cell/inpress.rss",
        organizer: ORGANIZER.CellPress
    },
    CancerCell: {
        name: "Cancer Cell",
        url: "https://www.cell.com/cancer-cell/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellGenomics: {
        name: "Cell Genomics",
        url: "https://www.cell.com/cell-genomics/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellChemicalBiology: {
        name: "Cell Chemical Biology",
        url: "https://www.cell.com/cell-chemical-biology/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellHostAndMicrobe: {
        name: "Cell Host & Microbe",
        url: "https://www.cell.com/cell-host-microbe/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellMetabolism: {
        name: "Cell Metabolism",
        url: "https://www.cell.com/cell-metabolism/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellReports: {
        name: "Cell Reports",
        url: "https://www.cell.com/cell-reports/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellReportsMedicine: {
        name: "Cell Reports Medicine",
        url: "https://www.cell.com/cell-reports-medicine/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellReportsMethods: {
        name: "Cell Reports Methods",
        url: "https://www.cell.com/cell-reports-methods/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellReportsPhysicalScience: {
        name: "Cell Reports Physical Science",
        url: "https://www.cell.com/cell-reports-physical-science/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellStemCell: {
        name: "Cell Stem Cell",
        url: "https://www.cell.com/cell-stem-cell/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CellSystems: {
        name: "Cell Systems",
        url: "https://www.cell.com/cell-systems/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Chem: {
        name: "Chem",
        url: "https://www.cell.com/chem/current.rss",
        organizer: ORGANIZER.CellPress
    },
    ChemCatalysis: {
        name: "Chem Catalysis",
        url: "https://www.cell.com/chem-catalysis/current.rss",
        organizer: ORGANIZER.CellPress
    },
    CurrentBiology: {
        name: "Current Biology",
        url: "https://www.cell.com/current-biology/current.rss",
        organizer: ORGANIZER.CellPress
    },
    DevelopmentalCell: {
        name: "Developmental Cell",
        url: "https://www.cell.com/developmental-cell/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Heliyon: {
        name: "Heliyon",
        url: "https://www.cell.com/heliyon/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Immunity: {
        name: "Immunity",
        url: "https://www.cell.com/immunity/current.rss",
        organizer: ORGANIZER.CellPress
    },
    iScience: {
        name: "iScience",
        url: "https://www.cell.com/iscience/inpress.rss",
        organizer: ORGANIZER.CellPress
    },
    Joule: {
        name: "Joule",
        url: "https://www.cell.com/joule/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Matter: {
        name: "Matter",
        url: "https://www.cell.com/matter/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Med: {
        name: "Med",
        url: "https://www.cell.com/med/current.rss",
        organizer: ORGANIZER.CellPress
    },
    MolecularCell: {
        name: "Molecular Cell",
        url: "https://www.cell.com/molecular-cell/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Neuron: {
        name: "Neuron",
        url: "https://www.cell.com/neuron/current.rss",
        organizer: ORGANIZER.CellPress
    },
    OneEarth: {
        name: "One Earth",
        url: "https://www.cell.com/one-earth/inpress.rss",
        organizer: ORGANIZER.CellPress
    },
    Patterns: {
        name: "Patterns",
        url: "https://www.cell.com/patterns/current.rss",
        organizer: ORGANIZER.CellPress
    },
    STARProtocols: {
        name: "STAR Protocols",
        url: "https://www.cell.com/star-protocols/current.rss",
        organizer: ORGANIZER.CellPress
    },
    Structure: {
        name: "Structure",
        url: "https://www.cell.com/structure/current.rss",
        organizer: ORGANIZER.CellPress
    },
    // CambridgeCore
    ActaNumerica: {
        name: "Acta Numerica",
        url: "https://www.cambridge.org/core/rss/product/id/12588D5F94C712C67A9B79018C6043E5",
        organizer: ORGANIZER.CambridgeCore
    },
    // Optica
    AdvancesInOpticsAndPhotonics: {
        name: "Advances in Optics and Photonics",
        url: "https://opg.optica.org/rss/aop_feed.xml",
        organizer: ORGANIZER.Optica
    },
    AppliedOptics: {
        name: "Applied Optics",
        url: "https://opg.optica.org/rss/ao_feed.xml",
        organizer: ORGANIZER.Optica
    },
    BiomedicalOpticsExpress: {
        name: "Biomedical Optics Express",
        url: "https://opg.optica.org/rss/boe_feed.xml",
        organizer: ORGANIZER.Optica
    },
    JournalOfTheOpticalSocietyOfAmericaA: {
        name: "Journal of the Optical Society of America A",
        url: "https://opg.optica.org/rss/josaa_feed.xml",
        organizer: ORGANIZER.Optica
    },
    JournalOfTheOpticalSocietyOfAmericaB: {
        name: "Journal of the Optical Society of America B",
        url: "https://opg.optica.org/rss/josab_feed.xml",
        organizer: ORGANIZER.Optica
    },
    Optica: {
        name: "Optica",
        url: "https://opg.optica.org/rss/optica_feed.xml",
        organizer: ORGANIZER.Optica
    },
    OpticalMaterialsExpress: {
        name: "Optical Materials Express",
        url: "https://opg.optica.org/rss/ome_feed.xml",
        organizer: ORGANIZER.Optica
    },
    OpticsExpress: {
        name: "Optics Express",
        url: "https://opg.optica.org/rss/opex_feed.xml",
        organizer: ORGANIZER.Optica
    },
    OpticsLetters: {
        name: "Optics Letters",
        url: "https://opg.optica.org/rss/ol_feed.xml",
        organizer: ORGANIZER.Optica
    },
    PhotonicsResearch: {
        name: "Photonics Research",
        url: "https://opg.optica.org/rss/prj_feed.xml",
        organizer: ORGANIZER.Optica
    },
    VirtualJournalForBiomedicalOptics: {
        name: "Virtual Journal for Biomedical Optics",
        url: "https://opg.optica.org/rss/vjbo_feed.xml",
        organizer: ORGANIZER.Optica
    },
    // ACS
    AccountsOfChemicalResearch: {
        name: "Accounts of Chemical Research",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=achre4",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AccountsOfMaterialsResearch: {
        name: "Accounts of Materials Research",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=apchd5",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAgriculturalScienceAndTechnology: {
        name: "ACS Agricultural Science & Technology",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aastgj",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAppliedBioMaterials: {
        name: "ACS Applied Bio Materials",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aabmcb",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAppliedElectronicMaterials: {
        name: "ACS Applied Electronic Materials",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aaembp",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAppliedEnergyMaterials: {
        name: "ACS Applied Energy Materials",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aaemcq",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAppliedMaterialsAndInterfaces: {
        name: "ACS Applied Materials & Interfaces",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aamick",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAppliedNanoMaterials: {
        name: "ACS Applied Nano Materials",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aanmf6",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsAppliedPolymerMaterials: {
        name: "ACS Applied Polymer Materials",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aapmcd",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsBioAndMedChemAu: {
        name: "ACS Bio & Med Chem Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=abmcb8",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsBiomaterialsScienceAndEngineering: {
        name: "ACS Biomaterials Science & Engineering",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=abseba",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsCatalysis: {
        name: "ACS Catalysis",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=accacs",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsCentralScience: {
        name: "ACS Central Science",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=acscii",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsChemicalBiology: {
        name: "ACS Chemical Biology",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=acbcct",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsChemicalHealthAndSafety: {
        name: "ACS Chemical Health & Safety",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=achsc5",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsChemicalNeuroscience: {
        name: "ACS Chemical Neuroscience",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=acncdm",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsEarthAndSpaceChemistry: {
        name: "ACS Earth and Space Chemistry",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aesccq1",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsEnergyLetters: {
        name: "ACS Energy Letters",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aelccp",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsEngineeringAu: {
        name: "ACS Engineering Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aeacb3",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsEnvironmentalAu: {
        name: "ACS Environmental Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aeacc4",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsEsAndTEngineering: {
        name: "ACS ES&T Engineering",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aeecco",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsEsAndTWater: {
        name: "ACS ES&T Water",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aewcaa",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsFoodScienceAndTechnology: {
        name: "ACS Food Science & Technology",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=afsthl",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsInfectiousDiseases: {
        name: "ACS Infectious Diseases",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aidcbc",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsMacroLetters: {
        name: "ACS Macro Letters",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=amlccd",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsMaterialsAu: {
        name: "ACS Materials Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=amacgu",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsMeasurementScienceAu: {
        name: "ACS Measurement Science Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=amachv",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsMedicinalChemistryLetters: {
        name: "ACS Medicinal Chemistry Letters",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=amclct",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsNano: {
        name: "ACS Nano",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=ancac3",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsNanoscienceAu: {
        name: "ACS Nanoscience Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=anaccx",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsOmega: {
        name: "ACS Omega",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=acsodf",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsOrganicAndInorganicAu: {
        name: "ACS Organic & Inorganic Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aoiab5",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsPharmacologyAndTranslationalScience: {
        name: "ACS Pharmacology & Translational Science",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=aptsfn",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsPhotonics: {
        name: "ACS Photonics",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=apchd5",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsPhysicalChemistryAu: {
        name: "ACS Physical Chemistry Au ",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=apcach",
        organizer: ORGANIZER.AmericanChemicalSociety

    },
    AcsPolymersAu: {
        name: "ACS Polymers Au",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=apaccd",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    AcsSensors: {
        name: "ACS Sensors",
        url: "https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=ascefj",
        organizer: ORGANIZER.AmericanChemicalSociety
    },
    // arXiv.org
    PhysicsOpticsUpdatesOnArXivOrg: {
        name: "physics.optics updates on arXiv.org",
        url: "http://export.arxiv.org/rss/physics.optics",
        organizer: ORGANIZER.ArXivOrg
    }
}

let endpointAssociateByName = new Map();
let endpointAssociateByOrganizer = new Map();

Object.entries(ENDPOINT).forEach(([key, value]) => {
    endpointAssociateByName.set(value.name, value);
    
    let origanizerEndpoints = endpointAssociateByOrganizer.get(value.organizer.name);
    if (origanizerEndpoints == undefined) {
        origanizerEndpoints = [value.name];
    } else {
        origanizerEndpoints.push(value.name);
    }
    endpointAssociateByOrganizer.set(value.organizer.name, origanizerEndpoints);
});

class Journal {
    constructor(endpoint, title, author, date, content, reference) {
        this.endpoint = endpoint;
        this.title = title;
        this.author = author;
        this.date = date;
        this.content = content;
        this.reference = reference;

        // compatible to previous version
        this.keywords = null;
        this.relativeScore = 0;
        this.impactFactor = 0;
        this.impactFactorScore = 1;
        this.totalScore = 0;
    }
}

function getRSSFeedsPromise(url, callback) {
    return new Promise((resolve, reject) => {
        request({ url }, (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }

            let rssParser = new RssParser();
            rssParser.parseString(body, (error, feed) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                let journals = callback(feed);
                resolve(journals);
            });
        });
    })
}

// handle with space and cdada section
function trimText(text) {
    text = text.trim();

    if (text.startsWith("<![CDATA[") && text.endsWith("]]>")) {
        return text.substring(9, text.length - 3);
    }

    return text;
}

function select(...text) {
    for (let t of text) {
        if (t != undefined && t != "") {
            return trimText(t);
        }
    }

    return "";
}

function selectDate(...date) {
    for (let d of date) {
        if (d != undefined && d != "") {
            return new Date(d);
        }
    }

    return new Date();
}

async function getRSSFeeds(endpointNames) {
    let promises = [];

    let endpoints = endpointNames.map((name) => {
        return endpointAssociateByName.get(name);
    });

    let promise;
    endpoints.forEach((endpoint) => {
        promise = getRSSFeedsPromise(endpoint.url, (feed) => {
            let journals = [];
            feed.items.forEach((item) => {
                let journal = new Journal(endpoint,
                    select(item["dc:title"], item.title),
                    select(item["dc:creator"], item["itunes:author"]),
                    selectDate(item.pubDate, item["dc:date"]),
                    select(item["content:encoded"], item.content, item.description, item["dc:description"]),
                    item.link
                );

                journals.push(journal);
            })

            return journals;
        });

        promises.push(promise);
    });

    let feeds = await Promise.all(promises)
    await getTfidf(feeds.flat());
    return await getRelativeIndex(feeds.flat());
}

async function getTfidf(feeds) {
    let keywords = await service.getKeywords();
    let feedsClone = JSON.parse(JSON.stringify(feeds));
    tfidf.addTFIDFDocument(feedsClone, keywords);
}

async function getRelativeIndex(feeds) {
    let keywords = await service.getKeywords();
    keywords = Object.entries(keywords).map((element) => {
        return element;
    });

    let jifInfo = jifIndex.importJIF();

    for(let i = 0; i < feeds.length; i++) {
        let relativeIndex = tfidf.relativeIndex(keywords, i);
        feeds[i].relativeScore = relativeIndex.tfidf_index;
        feeds[i].keywords = relativeIndex.related_keyword;

        for (let j = 0; j < jifInfo.length; j++) {
            if (stringSimilarity.compareTwoStrings(feeds[i].endpoint.name.toLowerCase(), jifInfo[j].journalName.toLowerCase()) >= 0.85) {
                feeds[i].impactFactor = jifInfo[j].JIF;
                feeds[i].impactFactorScore += jifIndex.JIFScore(jifInfo[j]);
                break;
            }
        }
    }

    let relativeScores = feeds.map((feed) => {return feed.relativeScore});
    let maxRelativeScore = util.max(relativeScores);
    let minRelativeScore = util.min(relativeScores);
    for (let i = 0; i < feeds.length; i++) {
        if (maxRelativeScore - minRelativeScore != 0) {
            feeds[i].relativeScore = 10 * (feeds[i].relativeScore - minRelativeScore) / (maxRelativeScore - minRelativeScore);
        }
        feeds[i].relativeScore = feeds[i].relativeScore.toFixed(3);
        feeds[i].totalScore = feeds[i].relativeScore * feeds[i].impactFactorScore;
        feeds[i].totalScore = feeds[i].totalScore.toFixed(3);
    }

    feeds.sort((a, b) => {
        return b.totalScore - a.totalScore;
    });

    return feeds;
}

async function updateFeeds() {
    let endpoints_ = await service.getEndpoints();
    let endpoints = Array.from(endpoints_);

    let feeds = await getRSSFeeds(endpoints);
    let feedIds = feeds.map((feed) => {
        let id = util.hashSha256(JSON.stringify({title: feed.title, content: feed.content}));
        service.setJournal(id, feed);
        return id;
    })

    service.setPendingJournalIds(feedIds);
    return feedIds;
}

async function getPendingJournalIds() {
    let journalIds = await service.getPendingJournalIds();
    if (journalIds.length == 0) {
        journalIds = await updateFeeds();
        return journalIds;
    }

    return journalIds;
}

async function getJournalsByIds(ids) {
    let journals = {};
    for (let id of ids) {
        journals[id] = await service.getJournal(id);
    }

    return journals;
}

module.exports = { getRSSFeeds, ORGANIZER, endpointAssociateByName, endpointAssociateByOrganizer, updateFeeds, getPendingJournalIds, getJournalsByIds };
