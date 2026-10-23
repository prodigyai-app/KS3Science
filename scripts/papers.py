"""Original practice, never copies of department assessment papers."""
P={}
def paper(year,letter,rows):
 P[(year,letter)]=[dict(title=f'Question {i+1}',q=q,m=3,ms=scheme.split('~')) for i,(q,scheme) in enumerate(rows)]
paper(7,'A',[
('A pupil tests the effect of water temperature on sugar dissolving time. Identify the independent and dependent variables and one control.','Independent temperature~Dependent time to dissolve~Control sugar mass, water volume, stirring or particle size'),
('A balance reads 3 g with nothing on it. Explain the type of error and how to improve the measurement.','Systematic/zero error~Readings have a consistent offset~Tare/calibrate before use; averaging alone does not remove the offset'),
('A microscope has a ×12 eyepiece and ×10 objective. Find total magnification and state one rule for a clear biological drawing.','12×10~×120~Clear single lines/ruled labels/proportional structures'),
('Explain how a plant leaf cell differs from an animal cell, giving three relevant structures.','Cellulose cell wall~Chloroplasts in photosynthetic cells~Large permanent vacuole; contrast with typical animal cell'),
('Explain why a pair of antagonistic muscles is needed to bend and straighten a joint.','Muscles pull by contracting~One contracts for one direction~The opposing muscle contracts for the reverse'),
('Use the particle model to explain why a gas fills its container but a solid keeps its shape.','Gas particles move randomly with large gaps~They spread throughout available space~Solid particles vibrate around fixed positions'),
('Describe how to obtain salt crystals from a mixture of dry salt and sand.','Add water to dissolve salt~Filter out insoluble sand~Concentrate filtrate and crystallise'),
('A lamp takes in 240 J and transfers 36 J as useful visible light. Find its efficiency and unwanted transfer.','Efficiency 36/240=0.15~15%~Unwanted energy 204 J'),
('A 1.5 kW heater runs for 2 hours at an assumed 24 p/kWh. Calculate energy and cost.','Energy 3 kWh~3×24~72 p'),
('Compare inherited and environmental variation, using one suitable example of each.','Inherited differences arise from genetic information~Environmental differences arise from conditions/experiences~Examples such as ABO blood group and a scar, accepting appropriate interaction explanations')])
paper(7,'B',[
('Describe fertilisation and implantation in humans, including their usual locations.','Gamete nuclei fuse at fertilisation~Fertilisation usually in an oviduct~Embryo implants in uterine lining later'),
('Explain two adaptations of an insect-pollinated flower.','Feature such as coloured petals/scent~Attracts insects~Nectar/sticky pollen with a correct link to pollen transfer'),
('Explain how pollination differs from fertilisation in flowering plants.','Pollination transfers pollen from anther to stigma~Pollen tube then grows towards an ovule~Fertilisation fuses male and egg nuclei'),
('State three conditions commonly needed for seed germination, explaining one.','Water~Oxygen~Suitable temperature, with explanation such as oxygen for aerobic respiration'),
('A pupil says a strong acid must be concentrated. Explain why this is incorrect.','Strength concerns extent of ionisation~Concentration is amount per solution volume~A strong acid can be dilute'),
('Name the products when zinc reacts with dilute hydrochloric acid and describe a test for the gas.','Zinc chloride~Hydrogen~A small gas sample gives a squeaky pop with a lighted splint under supervision'),
('Given magnesium is more reactive than copper, predict what happens when magnesium is put in copper sulfate solution.','Magnesium displaces copper~Magnesium sulfate forms~Copper is produced because magnesium is more reactive'),
('Two parallel branches carry 0.35 A and 0.45 A. Find supply current and explain the principle.','0.35+0.45~0.80 A~Charge is conserved at the junction'),
('A resistor has 9 V across it and carries 0.3 A. Find its resistance and describe the voltmeter connection.','R=V/I~9/0.3=30 Ω~Voltmeter connected in parallel'),
('Explain why the total energy of a bouncing ball and its surroundings is conserved even though each rebound is lower.','Mechanical energy decreases~Energy transfers to thermal stores and sound in surroundings~Total energy remains conserved')])
paper(8,'A',[
('In grass → grasshopper → bird, predict two possible effects of a fall in grasshopper numbers and give one limitation.','Grass may be eaten less and increase~Birds may have less food and decline~Other food sources/interactions may alter the outcome'),
('Describe how random quadrats can estimate a plant population in a field.','Random coordinates and consistent quadrat area/counting~Calculate mean per unit area from sufficient samples~Multiply by field area, acknowledging sampling uncertainty'),
('A trolley travels 3.6 m in 6 s. Find average speed and state one way to reduce timing error.','Speed=3.6/6~0.6 m/s~Electronic timing or a longer measured interval with justification'),
('Explain the forces on a parachutist falling at terminal velocity.','Weight acts down~Drag acts up with equal magnitude~Zero resultant means constant velocity'),
('Distinguish an element, a compound and a mixture using suitable examples.','Element one atom type, e.g. iron~Compound chemically bonded elements in fixed ratio, e.g. water~Mixture substances together without chemical combination, e.g. air'),
('State the reactivity trends down Group 1 and Group 7, and predict whether chlorine can displace bromine from a bromide solution.','Group 1 generally increases~Group 7 generally decreases~Chlorine displaces bromine because chlorine is more reactive'),
('Explain how alveoli are adapted for gas exchange.','Large surface area~Thin walls shorten diffusion distance~Blood supply and ventilation maintain concentration differences'),
('Explain the roles of enzymes and villi in digestion and absorption.','Enzymes break large molecules into small soluble products~Villi increase absorption area~Thin surface/blood supply supports transfer to circulation'),
('Describe the positive iodine test and explain what a negative result does and does not show.','Blue-black with starch~Negative means starch was not detected under the test conditions~Other carbohydrates can still be present'),
('Explain why nicotine vaping should not be described as harmless for young people.','Nicotine can cause dependence~Developing lungs/brains can be sensitive to effects~Less harmful than smoking does not mean risk-free or appropriate for non-smokers')])
paper(8,'B',[
('A wave has frequency 8 Hz and wavelength 0.5 m. Calculate speed and explain frequency.','Speed=fλ~4 m/s~Frequency is complete oscillations per second'),
('Explain how a higher-pitched sound differs from a louder sound.','Higher pitch means higher frequency~Louder sound relates to greater amplitude/intensity~These can change independently'),
('A ray hits a plane mirror at 28° to the normal. Find reflection angle and angle to the mirror surface.','Reflection 28° to normal~Normal is perpendicular to mirror~62° to surface'),
('A reaction in an open flask loses measured mass as gas escapes. Explain why this does not violate conservation of mass.','Gas leaves the measured system~Atoms/mass still exist outside the flask~A complete closed-system total is conserved'),
('Explain exothermic reactions using energy needed to break bonds and energy released when bonds form.','Bond breaking requires energy~Bond formation releases energy~More is released than required overall, warming surroundings'),
('Explain why a catalyst can produce more gas after 30 seconds but the same final gas total.','Catalyst increases reaction rate~Same limiting reactant amount can produce the same total~Completion is reached sooner'),
('State the aerobic respiration word equation and distinguish respiration from breathing.','Glucose+oxygen→carbon dioxide+water~Respiration is a cellular chemical process transferring energy~Breathing moves air in and out'),
('State yeast fermentation products and explain one use in bread making.','Ethanol~Carbon dioxide~Gas makes dough rise'),
('Explain why brighter light stops increasing pondweed oxygen production beyond a certain point.','Light initially limits photosynthesis~Another factor such as carbon dioxide becomes limiting~Increasing only light cannot remove the new limitation'),
('A pupil claims warm dye spreads faster only because of diffusion. Suggest a control and explain an alternative process and a limitation.','Same dye amount/vessel/volume and no stirring~Convection can move coloured water~Observed spreading alone cannot isolate molecular diffusion')])
paper(9,'A',[
('Explain why a compass aligns near a bar magnet and state the field-line direction outside it.','Compass is a magnet~It experiences a turning effect in the field~Outside field lines run north to south'),
('Describe an electromagnet relay and explain one benefit of a controllable magnet.','Current in a coil produces a field~Field attracts an armature to operate a switch~Switching current can control/release the action'),
('A 30 N force moves a load 2.5 m in its direction. Calculate work and explain the unit.','W=Fs~75 J~Joule measures transferred energy'),
('A 15 N force at 0.4 m balances another force at 0.6 m. Find the other force.','First moment 6 N m~F×0.6=6~F=10 N'),
('Explain how a vacuum flask reduces conduction, convection and radiation.','Vacuum reduces particle-based conduction~Vacuum prevents convection across the gap~Low-emissivity reflective surfaces reduce radiation'),
('Explain how burning fossil fuels changes the carbon cycle and can affect climate.','Transfers stored carbon into atmospheric carbon dioxide~CO₂ absorbs/re-emits infrared~Changed energy balance contributes to warming'),
('Explain why aluminium is commonly extracted by electrolysis while some less reactive metal oxides can be reduced with carbon.','Reactivity affects extraction method~Carbon can reduce oxides of metals below it~Aluminium is more reactive than carbon'),
('Give two environmental benefits and one limitation of recycling metals.','Conserves finite ores~Often reduces extraction energy/impacts~Collection/sorting/processing still uses resources'),
('Describe evolution by natural selection in three linked stages.','Inherited variation~Differential survival and reproduction under a selection pressure~Advantageous alleles become more common across generations'),
('Explain why a conservation breeding programme alone may not save a wild species.','Needs sufficient genetic diversity and successful breeding~Suitable habitat/threat reduction is also needed~Without these, released animals may not establish a viable population')])
paper(9,'B',[
('Explain the relationship between DNA, chromosomes and genes.','Chromosomes contain long DNA molecules~Genes are sections of DNA~Alleles are versions of a gene'),
('For a hypothetical single-gene trait, cross Aa with Aa. Give the genotype ratio and recessive phenotype probability.','AA,Aa,Aa,aa~Genotype ratio 1:2:1~Recessive probability 1/4 under complete dominance'),
('An ultrasound pulse returns after 0.00008 s in a medium with speed 1500 m/s. Find the reflector depth.','Total path 1500×0.00008=0.12 m~Divide by 2 for return journey~Depth 0.06 m'),
('Compare sound and electromagnetic waves in terms of medium and ionisation.','Sound needs a medium, EM can cross vacuum~Sound is not ionising radiation~High-energy EM such as X-rays can ionise'),
('Describe how igneous, sedimentary and metamorphic rocks form.','Igneous from cooling molten material~Sedimentary from deposited material compacted/cemented or other valid sedimentary process~Metamorphic from heat/pressure without melting'),
('Explain ordinary Moon phases and why they do not require an eclipse.','Moon reflects sunlight with about half illuminated~We see different fractions of that half during orbit~Earth’s shadow causes lunar eclipses, not normal phases'),
('Explain Earth’s seasons using axial tilt rather than Earth–Sun distance.','Axis tilted~Hemisphere towards Sun has longer days~Higher sunlight angle increases energy received per area'),
('A spring extends 0.025 m under 5 N. Find its spring constant and give one limitation of the model.','k=F/x~200 N/m~Proportional relation only below limit of proportionality'),
('A 480 N force acts over 0.024 m². Find pressure and explain the effect of doubling area at fixed force.','p=F/A=20,000 Pa~Pressure inversely related to area~New pressure 10,000 Pa'),
('Explain how a hydraulic system can increase output force without creating energy.','Pressure change transmitted through enclosed fluid~Larger output area gives larger force~Larger output piston moves a shorter distance in the ideal system')])
