function orgList(){
    var list_of_org = [];

    list_of_org[0] = ["assets/images/AAAS-logo.png","American Association for the Advancement of Science"];
    list_of_org[1] = ["assets/images/APS-Phy-logo.png","American Physical Society"];
    list_of_org[2] = ["assets/images/AIP-logo.png","American Institute of Physics"];
    list_of_org[3] = ["assets/images/ASCE-logo.png","American Society of Civil Engineers"];
    list_of_org[4] = ["assets/images/APA-logo.png","American Psychological Association"];
    list_of_org[5] = ["assets/images/Forbes-logo.png", "Forbes"];
    list_of_org[6] = ["assets/images/Nature-logo.png","Nature"];
    list_of_org[7] = ["assets/images/Wiley-logo.png", "Wiley"];
    list_of_org[8] = ["assets/images/The-lancet-logo.png","The Lancet"];
    list_of_org[9] = ["assets/images/NEJM-logo.png","New England Journal of Medicine"];
    list_of_org[10] = ["assets/images/cell-press-logo.png","Cell Press"]
    list_of_org[11] = ["assets/images/Cambridge-Core-logo.png","Cambridge Core"]
    list_of_org[12] = ["assets/images/Optica-logo.png","Optica"];
    list_of_org[13] = ["assets/images/American_Chemical_Society_logo.svg.png","American Chemical Society"];
    list_of_org[14] = ["assets/images/arXiv-logo.jpeg","ArXiv.org"];

    return list_of_org;
}
function rssList(){
    var org_size = orgList().length;
    var list_of_rss = []; // [name,url]
    for(var i=0; i<org_size; i++){
        list_of_rss[i] = [];
    }

    // AAAS //////////////////////////////////////////////////////////////////
    list_of_rss[0][0] = ["Science Magazine Feeds", "https://www.omnycontent.com/d/playlist/e763ee7a-311f-4004-8c05-ad8a0018d51b/68fe80a5-856c-4341-9f13-ada1016db982/dddf1674-4d7d-4aaf-a7f9-ada1016db98c/podcast.rss"];
    list_of_rss[0][1] = ["Science Daily News Feed","https://www.science.org/rss/news_current.xml"];
    list_of_rss[0][2] = ["Science Signaling Feeds","https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=signaling"];
    list_of_rss[0][3] = ["Science Translational Medicine Feed","https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=stm"];
    list_of_rss[0][4] = ["Science Advances Feed", "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=sciadv"];
    list_of_rss[0][5] = ["Science Immunology Feed", "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=sciimmunol"];
    list_of_rss[0][6] = ["Science Robotics Feed", "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=scirobotics"];
    list_of_rss[0][7] = ["Science","https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science"];

    // APS Physics //////////////////////////////////////////////////////////////////
    list_of_rss[1][0] = ["Advances in Atomic, Molecular, and Optical Physics","http://feeds.aps.org/rss/tocsec/PRL-AtomicMolecularandOpticalPhysics.xml"];
    list_of_rss[1][1] = ["Condensed Matter: Electronic Properties, etc.","http://feeds.aps.org/rss/tocsec/PRL-CondensedMatterElectronicPropertiesetc.xml"];
    list_of_rss[1][2] = ["Condensed Matter: Structure, etc.","http://feeds.aps.org/rss/tocsec/PRL-CondensedMatterStructureetc.xml"];
    list_of_rss[1][3] = ["Elementary Particles and Fields","http://feeds.aps.org/rss/tocsec/PRL-ElementaryParticlesandFields.xml"];
    list_of_rss[1][4] = ["General Physics: Statistical and Quantum Mechanics, Quantum Information, etc.", "http://feeds.aps.org/rss/tocsec/PRL-GeneralPhysicsStatisticalandQuantumMechanicsQuantumInformationetc.xml"];
    list_of_rss[1][5] = ["Gravitation and Astrophysics", "http://feeds.aps.org/rss/tocsec/PRL-GravitationandAstrophysics.xml"];
    list_of_rss[1][6] = ["Nonlinear Dynamics, Fluid Dynamics, Classical Optics, etc.","http://feeds.aps.org/rss/tocsec/PRL-NonlinearDynamicsFluidDynamicsClassicalOpticsetc.xml"];
    list_of_rss[1][7] = ["Nuclear Physics", "http://feeds.aps.org/rss/tocsec/PRL-NuclearPhysics.xml"];
    list_of_rss[1][8] = ["Plasma and Beam Physics","http://feeds.aps.org/rss/tocsec/PRL-PlasmaandBeamPhysics.xml"];
    list_of_rss[1][9] = ["Soft Matter, Biological, and Interdisciplinary Physics", "http://feeds.aps.org/rss/tocsec/PRL-SoftMatterBiologicalandInterdisciplinaryPhysics.xml"];
    list_of_rss[1][10] = ["Physical Review Applied","http://feeds.aps.org/rss/recent/prapplied.xml"];

    // American Institute of Physics //////////////////////////////////////////////////////////////////
    list_of_rss[2][0] = ["Applied Physics Letters","https://pubs.aip.org/rss/site_1000017/1000011.xml"];
    list_of_rss[2][1] = ["CHAOS","https://aipp.silverchair.com/rss/site_1000025/1000015.xml"];
    list_of_rss[2][2] = ["Journal Of Applied Physics","https://aipp.silverchair.com/rss/site_1000029/1000017.xml"];
    list_of_rss[2][3] = ["Biomicrofluidics","https://aipp.silverchair.com/rss/site_1000021/1000013.xml"];
    list_of_rss[2][4] = ["Journal Of Mathematical Physics","https://aipp.silverchair.com/rss/site_1000031/1000018.xml"];
    list_of_rss[2][5] = ["Journal Of Renewable and Sustainable Energy","https://aipp.silverchair.com/rss/site_1000033/1000019.xml"];
    list_of_rss[2][6] = ["Low Temperature Physics","https://pubs.aip.org/rss/site_1000035/1000020.xml"];
    list_of_rss[2][7] = ["Physics Of Fluids","https://aipp.silverchair.com/rss/site_1000037/1000021.xml"];
    list_of_rss[2][8] = ["Physics Of Plasmas","https://aipp.silverchair.com/rss/site_1000039/1000022.xml"];
    list_of_rss[2][9] = ["Review Of Scientific Instruments","https://pubs.aip.org/rss/site_1000041/1000023.xml"];
    list_of_rss[2][10] = ["Journal Of Chemical Physics", "https://aipp.silverchair.com/rss/site_1000043/1000024.xml"];
    list_of_rss[2][11] = ["APL Photonics", "https://pubs.aip.org/rss/site_1000015/1000010.xml"];

    //asce //////////////////////////////////////////////////////////////////
    list_of_rss[3][0] = ["Journal of Aerospace Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jaeeez"];
    list_of_rss[3][1] = ["Journal of Architectural Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jaeied"];
    list_of_rss[3][2] = ["Journal of Bridge Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jbenf2"];
    list_of_rss[3][3] = ["Journal of Civil Engineering Education","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jceecd"];
    list_of_rss[3][4] = ["Journal of Cold Regions Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jcrgei"];
    list_of_rss[3][5] = ["Journal of Composites for Construction","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jccof2"];
    list_of_rss[3][6] = ["Journal of Computing in Civil Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jccee5"];
    list_of_rss[3][7] = ["Journal of Construction Engineering and Management","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jcemd4"];
    list_of_rss[3][8] = ["Journal of Energy Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jleed9"];
    list_of_rss[3][9] = ["Journal of Engineering Mechanics","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jenmdt"];
    list_of_rss[3][10] = ["Journal of Environmental Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=joeedu"];
    list_of_rss[3][11] = ["Journal of Geotechnical and Geoenvironmental Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jggefk"];
    list_of_rss[3][12] = ["Journal of Hazardous, Toxic, and Radioactive Waste","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhtrbp"];
    list_of_rss[3][13] = ["Journal of Highway and Transportation Research and Development (English Edition)","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhtrcq"];
    list_of_rss[3][14] = ["Journal of Hydraulic Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhend8"];
    list_of_rss[3][15] = ["Journal of Hydrologic Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jhyeff"];
    list_of_rss[3][16] = ["Journal of Infrastructure Systems","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jitse4"];
    list_of_rss[3][17] = ["Journal of Irrigation and Drainage Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jidedh"];
    list_of_rss[3][18] = ["Journal of Legal Affairs and Dispute Resolution in Engineering and Construction","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jladah"];
    list_of_rss[3][19] = ["Journal of Management in Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jmenea"];
    list_of_rss[3][20] = ["Journal of Materials in Civil Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jmcee7"];
    list_of_rss[3][21] = ["Journal of Performance of Constructed Facilities","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jpcfev"];
    list_of_rss[3][22] = ["Journal of Pipeline Systems Engineering and Practice","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jpsea2"];
    list_of_rss[3][23] = ["Journal of Structural Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jsendh"];
    list_of_rss[3][24] = ["Journal of Surveying Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jsued2"];
    list_of_rss[3][25] = ["Journal of Sustainable Water in the Built Environment","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jswbay"];
    list_of_rss[3][26] = ["Journal of Transportation Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jtpedi"];
    list_of_rss[3][27] = ["Journal of Transportation Engineering, Part A: Systems","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jtepbs"];
    list_of_rss[3][28] = ["Journal of Transportation Engineering, Part B: Pavements","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jpeodx"];
    list_of_rss[3][29] = ["Journal of Urban Planning and Development","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jupddm"];
    list_of_rss[3][30] = ["Journal of Water Resources Planning and Management","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jwrmd5"];
    list_of_rss[3][31] = ["Journal of Waterway, Port, Coastal, and Ocean Engineering","https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jwped5"];

    //APA //////////////////////////////////////////////////////////////////////////
    list_of_rss[4][0] = ["American Journal of Orthopsychiatry","http://content.apa.org/journals/ort.rss?_ga=2.133941900.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][1] = ["American Psychologist®","http://content.apa.org/journals/amp.rss?_ga=2.157592504.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][2] = ["Archives of Scientific Psychology","http://content.apa.org/journals/arc.rss?_ga=2.192660264.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][3] = ["Asian American Journal of Psychology","http://content.apa.org/journals/aap.rss?_ga=2.94946206.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][4] = ["Behavior Analysis","http://content.apa.org/journals/bar.rss?_ga=2.94677790.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][5] = ["Behavioral Development Bulletin","http://content.apa.org/journals/bdb.rss?_ga=2.94677790.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][6] = ["Behavioral Neuroscience®","http://content.apa.org/journals/bne.rss?_ga=2.99206940.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][7] = ["Canadian Journal of Behavioural Science","http://content.apa.org/journals/cbs.rss?_ga=2.99206940.340304673.1668267804-1514980598.1668267803"];
    list_of_rss[4][8] = ["Canadian Journal of Experimental Psychology","http://content.apa.org/journals/cep.rss?_ga=2.99206940.340304673.1668267804-1514980598.1668267803"];

    //Forbes //////////////////////////////////
    list_of_rss[5][0] = ["Forbes - Science","https://www.forbes.com/science/feed2"];
    list_of_rss[5][1] = ["Forbes - Money","https://www.forbes.com/money/feed/"];
    list_of_rss[5][2] = ["Forbes - Business","https://www.forbes.com/business/feed/"];
    list_of_rss[5][3] = ["Forbes - Small Business","https://www.forbes.com/small-business/feed/"];
    list_of_rss[5][4] = ["Forbes - Billionaires", "https://www.forbes.com/worlds-billionaires/feed/"];
    list_of_rss[5][5] = ["Forbes - Innovation", "https://www.forbes.com/innovation/feed2"];
    list_of_rss[5][6] = ["Forbes - Leadership","https://www.forbes.com/leadership/feed2/"]
    list_of_rss[5][7] = ["Forbes - Lifestyle","https://www.forbes.com/lifestyle/feed"];
    list_of_rss[5][8] = ["Forbes - Real Estate","https://www.forbes.com/real-estate/feed/"];
    list_of_rss[5][9] = ["Forbes - Games","https://www.forbes.com/games/feed/"];
    list_of_rss[5][10] = ["Forbes - Markets","https://www.forbes.com/markets/feed/"];
    list_of_rss[5][11] = ["Forbes - Investing","https://www.forbes.com/investing/feed/"];

    //Nature //////////////////////////////////////////////////////////////////
    list_of_rss[6][0] = ["Nature Communications","https://www.nature.com/ncomms.rss"];
    list_of_rss[6][1] = ["Nature Materials","https://www.nature.com/nmat.rss"];
    list_of_rss[6][2] = ["Nature Nanotechnology","https://www.nature.com/nnano.rss"];
    list_of_rss[6][3] = ["Nature","https://www.nature.com/nature.rss"];
    list_of_rss[6][4] = ["Nature Photonics","https://www.nature.com/nphoton.rss"];
    list_of_rss[6][5] = ["Light: Science & Applications","https://www.nature.com/lsa.rss"];
    list_of_rss[6][6] = ["Nature Physics","https://www.nature.com/nphys.rss"];

    //Wiley //////////////////////////////////////////////////////////////////
    list_of_rss[7][0] = ["Advanced Materials","https://onlinelibrary.wiley.com/feed/15214095/most-recent"];
    list_of_rss[7][1] = ["WIREs Nanomedicine and Nanobiotechnology","https://wires.onlinelibrary.wiley.com/action/showFeed?jc=19390041&type=etoc&feed=rss"];
    list_of_rss[7][2] = ["The Journal of Finance","https://onlinelibrary.wiley.com/feed/15406261/most-recent"];
    list_of_rss[7][3] = ["Geophysical Research Letters:","https://agupubs.onlinelibrary.wiley.com/feed/19448007/most-recent"];
    list_of_rss[7][4] = ["The Plant Journal","https://onlinelibrary.wiley.com/action/showFeed?jc=1365313x&type=etoc&feed=rss"];
    list_of_rss[7][5] = ["Global Change Biology","https://onlinelibrary.wiley.com/action/showFeed?jc=13652486&type=etoc&feed=rss"];
    list_of_rss[7][6] = ["ChemistrySelect","https://chemistry-europe.onlinelibrary.wiley.com/feed/23656549/most-recent"];
    list_of_rss[7][7] = ["Computer-Aided Civil and Infrastructure Engineering","https://onlinelibrary.wiley.com/feed/14678667/most-recent"];
    list_of_rss[7][8] = ["Fatigue & Fracture of Engineering Materials & Structures","https://onlinelibrary.wiley.com/feed/14602695/most-recent"];
    list_of_rss[7][9] = ["The Canadian Journal of Chemical Engineering","https://onlinelibrary.wiley.com/feed/1939019x/most-recent"];
    list_of_rss[7][10] = ["International Journal for Numerical Methods in Biomedical Engineering","https://onlinelibrary.wiley.com/feed/20407947/most-recent"];
    list_of_rss[7][11] = ["Journal of Food Process Engineering","https://onlinelibrary.wiley.com/feed/17454530/most-recent"];
    list_of_rss[7][12] = ["Protein Science","https://onlinelibrary.wiley.com/feed/1469896x/most-recent"];
    list_of_rss[7][13] = ["Environmental Toxicology and Chemistry","https://setac.onlinelibrary.wiley.com/feed/15528618/most-recent"];
    list_of_rss[7][14] = ["Biological Reviews","https://onlinelibrary.wiley.com/feed/1469185x/most-recent"];
    list_of_rss[7][15] = ["Medical Education","https://onlinelibrary.wiley.com/feed/13652923/most-recent"];
    list_of_rss[7][16] = ["CA: A Cancer Journal for Clinician","https://acsjournals.onlinelibrary.wiley.com/feed/15424863/most-recent"];
    list_of_rss[7][17] = ["Advanced Science","https://onlinelibrary.wiley.com/feed/21983844/most-recent"];
    list_of_rss[7][18] = ["Laser & Photonics Reviews","https://onlinelibrary.wiley.com/feed/18638899/most-recent"]

    //The Lancet
    list_of_rss[8][0] = ["The Lancet","https://www.thelancet.com/rssfeed/lancet_current.xml"];
    list_of_rss[8][1] = ["The Lancet Public Health","https://www.thelancet.com/rssfeed/lanpub_online.xmll"];
    list_of_rss[8][2] = ["Lancet Oncology","https://www.thelancet.com/rssfeed/lanonc_online.xml"];
    list_of_rss[8][3] = ["eBioMedicine","https://www.thelancet.com/rssfeed/ebiom_current.xml"];
    list_of_rss[8][4] = ["EClinicalMedicine","https://www.thelancet.com/rssfeed/eclinm_current.xml"];
    list_of_rss[8][5] = ["The Lancet Child & Adolescent Health","https://www.thelancet.com/rssfeed/lanchi_current.xml"];
    list_of_rss[8][6] = ["The Lancet Diabetes & Endocrinology","https://www.thelancet.com/rssfeed/landia_online.xml"];
    list_of_rss[8][7] = ["The Lancet Digital Health","https://www.thelancet.com/rssfeed/landig_online.xml"];
    list_of_rss[8][8] = ["The Lancet Gastroenterology & Hepatology","https://www.thelancet.com/rssfeed/langas_online.xml"];
    list_of_rss[8][9] = ["The Lancet Global Health","https://www.thelancet.com/rssfeed/langlo_online.xml"];
    list_of_rss[8][10] = ["The Lancet Haematology","https://www.thelancet.com/rssfeed/lanhae_online.xml"];
    list_of_rss[8][11] = ["The Lancet HIV","https://www.thelancet.com/rssfeed/lanhiv_online.xml"];
    list_of_rss[8][12] = ["The Lancet Infectious Diseases","https://www.thelancet.com/rssfeed/laninf_online.xml"];
    list_of_rss[8][13] = ["The Lancet Neurology","https://www.thelancet.com/rssfeed/laneur_online.xml"];
    list_of_rss[8][14] = ["The Lancet Microbe","https://www.thelancet.com/rssfeed/lanmic_online.xml"];
    list_of_rss[8][15] = ["The Lancet Planetary Health","https://www.thelancet.com/rssfeed/lanplh_online.xml"];
    list_of_rss[8][16] = ["The Lancet Psychiatry","https://www.thelancet.com/rssfeed/lanpsy_current.xml"];
    list_of_rss[8][17] = ["The Lancet Respiratory Medicine","https://www.thelancet.com/rssfeed/lanres_online.xml"];
    list_of_rss[8][18] = ["The Lancet Rheumatology","https://www.thelancet.com/rssfeed/lanrhe_online.xml"];
    list_of_rss[8][19] = ["The Lancet Regional Health – Western Pacific","https://www.thelancet.com/rssfeed/lanwpc_online.xml"];


    //NEJM
    list_of_rss[9][0] = ["New England Journal of Medicine","https://www.nejm.org/action/showFeed?jc=nejm&type=etoc&feed=rss"];

    //cell press
    list_of_rss[10][0] = ["Cell", "https://www.cell.com/cell/inpress.rss"];
    list_of_rss[10][1] = ["Cancer Cell", "https://www.cell.com/cancer-cell/current.rss"];
    list_of_rss[10][2] = ["Cell Genomics", "https://www.cell.com/cell-genomics/current.rss"];
    list_of_rss[10][3] = ["Cell Chemical Biology", "https://www.cell.com/cell-chemical-biology/current.rss"];
    list_of_rss[10][4] = ["Cell Host & Microbe", "https://www.cell.com/cell-host-microbe/current.rss"];
    list_of_rss[10][5] = ["Cell Metabolism", "https://www.cell.com/cell-metabolism/current.rss"];
    list_of_rss[10][6] = ["Cell Reports", "https://www.cell.com/cell-reports/current.rss"];
    list_of_rss[10][7] = ["Cell Reports Medicine", "https://www.cell.com/cell-reports-medicine/current.rss"];
    list_of_rss[10][8] = ["Cell Reports Methods", "https://www.cell.com/cell-reports-methods/current.rss"];
    list_of_rss[10][9] = ["Cell Reports Physical Science", "https://www.cell.com/cell-reports-physical-science/current.rss"];
    list_of_rss[10][10] = ["Cell Stem Cell", "https://www.cell.com/cell-stem-cell/current.rss"];
    list_of_rss[10][11] = ["Cell Systems", "https://www.cell.com/cell-systems/current.rss"];
    list_of_rss[10][12] = ["Chem", "https://www.cell.com/chem/current.rss"];
    list_of_rss[10][13] = ["Chem Catalysis", "https://www.cell.com/chem-catalysis/current.rss"];
    list_of_rss[10][14] = ["Current Biology", "https://www.cell.com/current-biology/current.rss"];
    list_of_rss[10][15] = ["Developmental Cell", "https://www.cell.com/developmental-cell/current.rss"];
    list_of_rss[10][16] = ["Heliyon", "https://www.cell.com/heliyon/current.rss"];
    list_of_rss[10][17] = ["Immunity", "https://www.cell.com/immunity/current.rss"];
    list_of_rss[10][18] = ["iScience", "https://www.cell.com/iscience/inpress.rss"];
    list_of_rss[10][19] = ["Joule", "https://www.cell.com/joule/current.rss"];
    list_of_rss[10][20] = ["Matter", "https://www.cell.com/matter/current.rss"];
    list_of_rss[10][21] = ["Med", "https://www.cell.com/med/current.rss"];
    list_of_rss[10][22] = ["Molecular Cell", "https://www.cell.com/molecular-cell/current.rss"];
    list_of_rss[10][23] = ["Neuron", "https://www.cell.com/neuron/current.rss"];
    list_of_rss[10][24] = ["One Earth", "https://www.cell.com/one-earth/inpress.rss"];
    list_of_rss[10][25] = ["Patterns", "https://www.cell.com/patterns/current.rss"];
    list_of_rss[10][26] = ["STAR Protocols", "https://www.cell.com/star-protocols/current.rss"];
    list_of_rss[10][27] = ["Structure", "https://www.cell.com/structure/current.rss"];


    //Cambridge Core
    list_of_rss[11][0] = ["Acta Numerica","https://www.cambridge.org/core/rss/product/id/12588D5F94C712C67A9B79018C6043E5"];

    // Optica
    list_of_rss[12][0] = ["Advances in Optics and Photonics","https://opg.optica.org/rss/aop_feed.xml"];
    list_of_rss[12][1] = ["Applied Optics","https://opg.optica.org/rss/ao_feed.xml"];
    list_of_rss[12][2] = ["Biomedical Optics Express","https://opg.optica.org/rss/boe_feed.xml"];
    list_of_rss[12][3] = ["Journal of the Optical Society of America A","https://opg.optica.org/rss/josaa_feed.xml"];
    list_of_rss[12][4] = ["Journal of the Optical Society of America B","https://opg.optica.org/rss/josab_feed.xml"];
    list_of_rss[12][5] = ["Optica","https://opg.optica.org/rss/optica_feed.xml"];
    list_of_rss[12][6] = ["Optical Materials Express","https://opg.optica.org/rss/ome_feed.xml"];
    list_of_rss[12][7] = ["Optics Express","https://opg.optica.org/rss/opex_feed.xml"];
    list_of_rss[12][8] = ["Optics Letters","https://opg.optica.org/rss/ol_feed.xml"];
    list_of_rss[12][9] = ["Photonics Research","https://opg.optica.org/rss/prj_feed.xml"];
    list_of_rss[12][10] = ["Virtual Journal for Biomedical Optics","https://opg.optica.org/rss/vjbo_feed.xml"];

    //American Chemical Society
    list_of_rss[13][0] = ["Accounts of Chemical Research","http://feeds.feedburner.com/acs/achre4"];
    list_of_rss[13][1] = ["Accounts of Materials Research","http://feeds.feedburner.com/acs/apchd5"];
    list_of_rss[13][2] = ["ACS Agricultural Science & Technology","http://feeds.feedburner.com/acs/aastgj"];
    list_of_rss[13][3] = ["ACS Applied Bio Materials","http://feeds.feedburner.com/acs/aabmcb"];
    list_of_rss[13][4] = ["ACS Applied Electronic Materials","http://feeds.feedburner.com/acs/aaembp"];
    list_of_rss[13][5] = ["ACS Applied Energy Materials","http://feeds.feedburner.com/acs/aaemcq"];
    list_of_rss[13][6] = ["ACS Applied Materials & Interfaces","http://feeds.feedburner.com/acs/aamick"];
    list_of_rss[13][7] = ["ACS Applied Nano Materials","http://feeds.feedburner.com/acs/aanmf6"];
    list_of_rss[13][8] = ["ACS Applied Polymer Materials","http://feeds.feedburner.com/acs/aapmcd"];
    list_of_rss[13][9] = ["ACS Bio & Med Chem Au","http://feeds.feedburner.com/acs/abmcb8"];
    list_of_rss[13][10] = ["ACS Biomaterials Science & Engineering","http://feeds.feedburner.com/acs/abseba"];
    list_of_rss[13][11] = ["ACS Catalysis","http://feeds.feedburner.com/acs/accacs"];
    list_of_rss[13][12] = ["ACS Central Science","http://feeds.feedburner.com/acs/acscii"];
    list_of_rss[13][13] = ["ACS Chemical Biology","http://feeds.feedburner.com/acs/acbcct"];
    list_of_rss[13][14] = ["ACS Chemical Health & Safety","http://feeds.feedburner.com/acs/achsc5"];
    list_of_rss[13][15] = ["ACS Chemical Neuroscience","http://feeds.feedburner.com/acs/acncdm"];
    list_of_rss[13][16] = ["ACS Earth and Space Chemistry","http://feeds.feedburner.com/acs/aesccq1"];
    list_of_rss[13][17] = ["ACS Energy Letters","http://feeds.feedburner.com/acs/aelccp"];
    list_of_rss[13][18] = ["ACS Engineering Au","http://feeds.feedburner.com/acs/aeacb3"];
    list_of_rss[13][19] = ["ACS Environmental Au","http://feeds.feedburner.com/acs/aeacc4"];
    list_of_rss[13][20] = ["ACS ES&T Engineering","http://feeds.feedburner.com/acs/aeecco"];
    list_of_rss[13][21] = ["ACS ES&T Water","http://feeds.feedburner.com/acs/aewcaa"];
    list_of_rss[13][22] = ["ACS Food Science & Technology","http://feeds.feedburner.com/acs/afsthl"];
    list_of_rss[13][23] = ["ACS Infectious Diseases","http://feeds.feedburner.com/acs/aidcbc"];
    list_of_rss[13][24] = ["ACS Macro Letters","http://feeds.feedburner.com/acs/amlccd"];
    list_of_rss[13][25] = ["ACS Materials Au","http://feeds.feedburner.com/acs/amacgu"];
    list_of_rss[13][26] = ["ACS Measurement Science Au","http://feeds.feedburner.com/acs/amachv"];
    list_of_rss[13][27] = ["ACS Medicinal Chemistry Letters","http://feeds.feedburner.com/acs/amclct"];
    list_of_rss[13][28] = ["ACS Nano","http://feeds.feedburner.com/acs/ancac3"];
    list_of_rss[13][29] = ["ACS Nanoscience Au","http://feeds.feedburner.com/acs/anaccx"];
    list_of_rss[13][30] = ["ACS Omega","http://feeds.feedburner.com/acs/acsodf"];
    list_of_rss[13][31] = ["ACS Organic & Inorganic Au","http://feeds.feedburner.com/acs/aoiab5"];
    list_of_rss[13][32] = ["ACS Pharmacology & Translational Science","http://feeds.feedburner.com/acs/aptsfn"];
    list_of_rss[13][33] = ["ACS Photonics","http://feeds.feedburner.com/acs/apchd5"];
    list_of_rss[13][34] = ["ACS Physical Chemistry Au ","http://feeds.feedburner.com/acs/apcach"];
    list_of_rss[13][35] = ["ACS Polymers Au","http://feeds.feedburner.com/acs/apaccd"];
    list_of_rss[13][36] = ["ACS Sensors","http://feeds.feedburner.com/acs/ascefj"];

    list_of_rss[14][0] = ["physics.optics updates on arXiv.org","http://export.arxiv.org/rss/physics.optics"]

    return list_of_rss;
}

module.exports = {orgList,rssList};