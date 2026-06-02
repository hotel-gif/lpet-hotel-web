export type LegalBlock =
  | { kind: "p"; text: string }       // a paragraph
  | { kind: "sub"; text: string }     // a sub-heading inside a section (e.g. "Condiciones Generales:")
  | { kind: "list"; items: string[] };// a bullet list
export type LegalSection = { heading: string; blocks: LegalBlock[] };
export type LegalDoc = { title: string; sections: LegalSection[] };

export const LEGAL: Record<"es" | "en", { terms: LegalDoc; privacy: LegalDoc }> = {
  es: {
    terms: {
      title: "Términos y Condiciones",
      sections: [
        {
          heading: "GENERALIDADES",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S identificada con NIT 901.514.369-7 domiciliada en la Calle 98 No. 7ª-72 de la ciudad de BOGOTÁ D.C., se permite comunicar a sus clientes y usuarios los siguientes TÉRMINOS Y CONDICIONES, aplicables a los servicios prestados en los La palma y el Tucán Hotel sobre la reserva de habitaciones y estadía en las instalaciones.",
            },
            {
              kind: "p",
              text: "Al ingresar y/o usar la página web y/o micrositios, así como al reservar o adquirir algún servicio de alojamiento por parte de COFFEE AND ADVENTURE S.A.S el cliente acepta haber leído y entendido los presentes TÉRMINOS Y CONDICIONES, por lo que, acepta acogerse a los mismos y cumplir con todas las leyes y reglamentos aplicables que hagan parte de la legislación colombiana, que serán de obligatorio cumplimiento para todos los clientes que hayan adquirido una reserva para alojamiento o uso de las instalaciones del hotel o goce de los servicios prestados en cualquiera de sus instalaciones.",
            },
            {
              kind: "p",
              text: "Los usuarios que decidan ingresar al sitio desde otros países lo harán bajo su propia iniciativa y, es su responsabilidad sujetarse a las leyes locales que le sean aplicables. Está prohibido el acceso al sitio desde territorios donde su contenido sea ilegal. En caso de que el usuario no esté de acuerdo con los presentes TÉRMINOS Y CONDICIONES debe abstenerse de usar el sitio y renuncia a presentar reclamos alegando falta de conocimiento de estos.",
            },
            {
              kind: "p",
              text: "Los presentes TÉRMINOS Y CONDICIONES están sujetos a cambios sin previo aviso. En cualquier momento COFFEE AND ADVENTURE S.A.S., puede modificar los presentes TÉRMINOS Y CONDICIONES y, a partir de la fecha de modificación de estos y, todas las operaciones que se celebren entre COFFEE AND ADVENTURE S.A.S. y el usuario se regirán por los términos y condiciones modificados.",
            },
            {
              kind: "p",
              text: "El portal web es gestionado y administrado por COFFEE AND ADVENTURE S.A.S., quien, pone a disposición de los visitantes y usuarios, su página web, los cuales, al hacer uso de la información, productos, servicios, aplicaciones, participar en las actividades, o hacer compras a través de la misma, reconocen haber leído, entendido y aceptado de forma plena y sin reservas los TÉRMINOS Y CONDICIONES aquí descritos. En caso de no estar de acuerdo con alguno o varios de los aspectos de este documento debe evitar utilizar los servicios del portal.",
            },
          ],
        },
        {
          heading: "CAPACIDAD",
          blocks: [
            {
              kind: "p",
              text: "Los productos y/o servicios que COFFEE AND ADVENTURE S.A.S. ofrece a través del sitio están disponibles únicamente para aquellas personas que cuentan con la capacidad legal para contratar y, obligarse según lo dispuesto por la legislación colombiana vigente.",
            },
            {
              kind: "p",
              text: "Si el usuario carece de dicha capacidad legal para contratar, no podrá hacer uso de los productos y servicios ofrecidos por el sitio. COFFEE AND ADVENTURE S.A.S. examinará la solicitud presentada por el usuario y, se reserva la facultad de verificar los datos comunicados por el usuario. COFFEE AND ADVENTURE S.A.S. no asume ninguna responsabilidad por suplantación personal que realice cualquier usuario.",
            },
          ],
        },
        {
          heading: "REGISTRO",
          blocks: [
            {
              kind: "p",
              text: "Previa adquisición de los productos y/o servicios que COFFEE AND ADVENTURE S.A.S. ofrece a través del sitio, es necesario que el usuario complete los datos de registro en todos sus campos. La información que el usuario proporcione deberá ser exacta y veraz (en lo sucesivo los «Datos Personales»).",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. cumple con los principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad y responsabilidad que establece la Ley Estatutaria 1581 de 2012 (en adelante la «Ley») la cual tiene por objeto dictar las disposiciones generales para la protección de datos personales y, desarrollar el derecho constitucional que tienen todas las personas a conocer, actualizar y rectificar las informaciones que se hayan recogido sobre ellas en bases de datos o archivos así como el derecho a la información.",
            },
            {
              kind: "p",
              text: "Al aceptar los TÉRMINOS Y CONDICIONES, el usuario indica voluntariamente conoce y autoriza de manera previa a COFFEE AND ADVENTURE S.A.S. para que sus datos personales puedan ser almacenados y usados con el fin de lograr una eficiente comunicación durante el presente trámite o actividad, y autoriza en los mismos términos que dicha información pueda ser tratada conforme a lo dispuesto en la Ley y sus Decretos Reglamentarios, lo anterior con el fin de recibir información acerca de sus productos, servicios, promociones, alianzas, contenidos, estudios y concursos, conforme a la política de protección de datos personales, publicada y disponible en el sitio web, la cual, el usuario declara que ha sido informado de la misma, en la cual se incluyen los procedimientos de consulta y reclamación que permiten al usuario hacer efectivos sus derechos de acceso, conocimiento, consulta, rectificación, actualización y supresión de los datos.",
            },
            {
              kind: "p",
              text: "Para mayor información sobre los Datos Personales recabados por el sitio, su finalidad y revocación de la autorización para el tratamiento de los mismos, puede verificar la política de protección de datos personales en la presente página web, y/o comunicarse con nosotros a través de correo electrónico a reservations@lapalmayeltucan.com",
            },
          ],
        },
        {
          heading: "USO DEL SITIO",
          blocks: [
            {
              kind: "p",
              text: "Al acceder al sitio Web se le proporciona acceso al usuario a: textos, gráficos, dibujos, diseños, códigos, software, fotografías, música, vídeos, sonidos, bases de datos, imágenes, expresiones e informaciones, etc. (en lo sucesivo el «Contenido») pertenecientes a COFFEE AND ADVENTURE S.A.S.",
            },
            {
              kind: "p",
              text: "El usuario al acceder al sitio se compromete a realizar un uso adecuado de su contenido, así como de los productos y/o servicios que se ofrecen a través de el mismo, por lo que, de manera enunciativa más no limitativa, se compromete a NO realizar:",
            },
            {
              kind: "list",
              items: [
                "Uso del Contenido para incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público;",
                "Alguna acción a través de algún dispositivo, software o cualquier medio para interferir en las actividades y operación de COFFEE AND ADVENTURE S.A.S. como en las solicitudes, ofertas, descripciones, cuentas o bases de datos de COFFEE AND ADVENTURE S.A.S.",
                "Alguna actividad que sea violatoria o contraria a las leyes de propiedad intelectual o a los presentes TÉRMINOS Y CONDICIONES, y,",
                "Introducir o difundir en el sitio virus informáticos o cualquier otro sistema que sea susceptible de provocar algún daño en el funcionamiento y operación del sitio.",
              ],
            },
          ],
        },
        {
          heading: "DERECHOS DE AUTOR Y PROPIEDAD INDUSTRIAL:",
          blocks: [
            {
              kind: "p",
              text: "Todos los derechos de propiedad intelectual del Contenido del sitio y que de manera enunciativa más no limitativa son el diseño gráfico, interfaces de usuario, interfaces visuales, fotografías, sonidos, dibujos, modelos, código informático (incluido el código HTML), la disposición, diseño, estructura, selección, expresión, aspecto estético y funcional, los logotipos de los productos y/o servicios ofrecidos, las marcas, diseños y modelos industriales, nombres de dominio, identificadores de cuenta o términos de búsqueda, entre otros, son propiedad de COFFEE AND ADVENTURE S.A.S. (o de terceros que han autorizado a COFFEE AND ADVENTURE S.A.S. su uso y/o explotación) y están protegidos por las normas nacionales e internacionales que le sean aplicables.",
            },
            {
              kind: "p",
              text: "Queda prohibido todo acto de copia, reproducción, modificación, creación de trabajos derivados, venta o distribución, exhibición de los contenidos, transmisión, adaptación, traducción, distribución, comunicación pública, incluida su modalidad de puesta a disposición, o cualquier otra explotación y/o modificación total o parcial de cualquier contenido incluido en el sitio, a través de cualquier medio, incluyendo de manera enunciativa más no limitativa, los medios electrónicos, mecánicos, de fotocopiado o de grabación sin previa autorización escrita de COFFEE AND ADVENTURE S.A.S.",
            },
            {
              kind: "p",
              text: "En ningún caso, los presentes TÉRMINOS Y CONDICIONES confieren licencia, derecho o autorización para realizar los actos antes descritos. Cualquier uso no autorizado del Contenido, constituirá una violación a los presentes TÉRMINOS Y CONDICIONES y, a las normas vigentes sobre marcas, derechos de autor y demás normas de propiedad intelectual, industrial, nacionales e internacionales que sean aplicables.",
            },
            {
              kind: "p",
              text: "El uso de códigos de descuentos no será compatible con determinadas acciones promocionales y colecciones.",
            },
          ],
        },
        {
          heading: "CONTENIDO PROPORCIONADO POR EL USUARIO:",
          blocks: [
            {
              kind: "p",
              text: "La legitimidad de los derechos de propiedad intelectual correspondientes a los contenidos aportados por el usuario es responsabilidad exclusiva de este, por lo que, el usuario mantendrá indemne a COFFEE AND ADVENTURE S.A.S. de cualquier reclamación de terceros derivada de la utilización ilícita de contenidos en el sitio.",
            },
            {
              kind: "p",
              text: "El usuario al proporcionar cualquier contenido (fotos, imágenes, etc.) a través del sitio o cualquier otro medio, cede gratuitamente a COFFEE AND ADVENTURE S.A.S. la totalidad de los derechos de propiedad intelectual o industrial y, cualesquiera otros derechos que el usuario tenga sobre dichos contenidos. Tales derechos incluyen el derecho de reproducción, representación, difusión, transformación, distribución y comunicación pública de todo o parte del contenido, por cualquier procedimiento y en todos los formatos o soportes.",
            },
          ],
        },
        {
          heading: "AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES",
          blocks: [
            {
              kind: "p",
              text: "El cliente o huésped autoriza al hotel el tratamiento de sus datos personales, entregados o suministrados a través de los diversos canales de comercialización tales como sitios web, call centers, entre otros. El hotel informa que los datos personales serán conservados con especial cuidado, de conformidad con lo establecido en la Ley 1266 de 2008, la Ley 1581 de 2012, el Decreto 1377 de 2013 y las demás normas relacionadas con la materia.",
            },
          ],
        },
        {
          heading: "POLÍTICA DE RESERVA",
          blocks: [
            {
              kind: "p",
              text: "Todas las reservas están sujetas a disponibilidad y se confirmarán por correo electrónico o mensaje de texto, para la misma se requiere el pago del costo total de la estancia para garantizar la reserva, el cual es reembolsable según los términos de cancelación establecidos a continuación.",
            },
            {
              kind: "p",
              text: "Las reservas realizadas a través de terceros (agencias de viajes en línea u otras.) están sujetas a las políticas y términos de estos terceros.",
            },
            {
              kind: "p",
              text: "El cliente confirma que ha recibido por parte del hotel toda la información necesaria o complementaria para la reserva, los términos, valores, válidas, condiciones, cambios, duración de la misma y demás, incluyendo lo relacionado con las instalaciones, servicios, ubicación, entre otros a través del sitio web y demás medios de comunicación; por lo anterior cualquier reserva realizadas a través del sitio web y cualquier otro medio, implica que realizó la consulta y acepto plenamente y sin limitaciones los presentes términos y condiciones de cualquier tipo de reserva.",
            },
            {
              kind: "p",
              text: "Por lo anterior la reserva se considera plenamente aceptada por el cliente o huésped, sin importar el medio de comunicación o electrónico por la cual la hubiere hecho, aprobando y asumiendo los términos y condiciones de esta. La reserva es estrictamente personal y no puede en ningún caso transferirse bajo ninguna condición o circunstancia a terceros, ni gratis ni por endoso o cesión, como tampoco por previo pago o por fines comerciales entre el cliente o huésped y dicho tercero.",
            },
            {
              kind: "p",
              text: "De conformidad con la normatividad turística, hotelera y los presentes términos y condiciones, todo cliente o huésped a la llegada al hotel, debe proceder a suministrar y llenar el documento o Tarjeta de Registro de Alojamiento (TRA), para ello, proporcionará su identificación, dirección permanente, profesión, correo electrónico, número de móvil y demás requisitos necesarios acorde a la legislación colombiana.",
            },
            {
              kind: "p",
              text: "Los precios o tarifas pactadas en la reserva, indica el tipo de habitación, número de personas, fechas y horas de Check In y Check Out y demás condiciones. La tarifa o precio acordado en la reserva, liquida el valor por la estadía, así como los impuestos aplicables para el servicio de hotelería por el Estado colombiano, sobre este último concepto su pago deberá realizarse previo al momento del check -in.",
            },
            {
              kind: "p",
              text: "El cliente o huésped, al momento de realizar la reserva, deberá proporcionar los datos de una tarjeta de crédito o débito autorizada si la reserva se efectúa a través de la página web. Si la reserva se realiza por otros canales, el huésped podrá efectuar la transferencia del valor correspondiente o utilizar un link de pago proporcionado por El Hotel para formalizar el pago o realizar transferencia a la cuenta bancaria certificada por El Hotel. Los consumos adicionales y demás servicios deberán ser abonados directamente en El Hotel, salvo que hayan sido previamente incluidos en el valor total de la reserva.",
            },
            {
              kind: "p",
              text: "Si un cliente o huésped reserva varias habitaciones y el pago lo garantiza con una sola tarjeta crédito o débito en forma directa o por medio de cualquier plataforma de pago, la tarjeta de pago relacionada y presentada como depósito servirá como garantía para todas las habitaciones reservadas por dicho cliente o huésped.",
            },
            {
              kind: "p",
              text: "Si el huésped paga su reserva en moneda diferente al peso colombiano, se liquidará el valor de la reserva al valor del cambio o tasa oficial de la moneda extranjera con el peso colombiano.",
            },
            {
              kind: "p",
              text: "Los huéspedes, aceptan y se comprometen a utilizar su habitación de forma respetuosa y responsable; por lo tanto, cualquier conducta contraria a las normas de buena convivencia, de comportamiento, orden público y demás conlleva a que el hotel, solicite al huésped que en forma directa o indirecta hubiere incumplido con dicha normatividad, que abandone las instalaciones del hotel sin compensación ni reembolso en el caso de que el pago ya se haya realizado; sino se ha realizado pago alguno, el huésped, deberá pagar el precio de las noches de estancia ya disfrutadas antes de dejar el hotel, sin que el anterior incumplimiento pueda conllevar a otras acciones legales.",
            },
          ],
        },
        {
          heading: "POLÍTICA DE CANCELACIÓN",
          blocks: [
            {
              kind: "p",
              text: "Los huéspedes deben comunicarse con el hotel directamente para cancelar o modificar sus reservas. Se pueden comunicar a la línea +57 311 444 1453 y a la dirección de correo electrónico reservations@lapalmayeltucan.com para facilitar este proceso.",
            },
            {
              kind: "p",
              text: "De igual forma, Las modificaciones en las fechas de reserva están sujetas a disponibilidad y pueden estar sujetas a cargos adicionales. Cualquier cambio en el tipo de habitación o paquete debe solicitarse con suficiente anticipación no menor a 7 días de antelación y estará sujeto a la aprobación del hotel.",
            },
            {
              kind: "p",
              text: "El huésped puede cancelar sin cargos adicionales hasta con un mínimo de 7 días hábiles antes de la fecha de llegada, en este caso para efectos del reembolso del pago realizado, solo se aplicará un cargo del 6% del valor total de la reserva por gastos administrativos y bancarios, así como el 4*1000, valor que dependerá del monto especifico de cada reserva. Este cargo cubre los costos asociados con el procesamiento de la reserva y cualquier transacción bancaria realizada para el reembolso. El importe específico de estos cargos se detallará en la confirmación de cancelación.",
            },
            {
              kind: "p",
              text: "En caso de cancelación tardía se cargará el importe equivalente al 100% de los cargos de su reserva. En caso de no presentación (no show), se cargará el importe total de la reserva.",
            },
            {
              kind: "p",
              text: "Durante períodos de alta demanda o eventos especiales, la cancelación debe realizarse con 7 días de antelación para evitar cargos adicionales. Los cargos por cancelación durante estos períodos pueden ser más altos y serán especificados al realizar la reserva.",
            },
            {
              kind: "p",
              text: "En casos de fuerza mayor o circunstancias imprevistas, el hotel puede considerar excepciones a la política de cancelación. Los huéspedes deben comunicarse con el hotel lo antes posible para discutir cualquier situación excepcional y entregar los correspondientes soportes de fuerza mayor o imprevistos.",
            },
            {
              kind: "p",
              text: "Los reembolsos se procesarán dentro de los 15 días hábiles después de la cancelación y se realizarán de acuerdo con la política cancelación establecida.",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. se reserva el derecho de realizar cambios en esta política sin previo aviso.",
            },
          ],
        },
        {
          heading: "POLÍTICA DE INGRESO Y SALIDA DEL HOTEL (CHECK-IN/CHECK-OUT)",
          blocks: [
            {
              kind: "p",
              text: "El Ingreso (Check-In), está disponible a partir de las 15:00 HORAS o 3:00 PM en el día de llegada programado. Los huéspedes deben presentar una identificación válida (documento de identidad o pasaporte). Todo cliente extranjero que solicite reserva o se presente al hotel sin excepción, incluyendo menores extranjeros, deben obligatoriamente presentar su documentación personal y familiar correspondiente, es decir el pasaporte o los documentos requeridos, conforme la normatividad del Estado Colombiano para los extranjeros para su estadía.",
            },
            {
              kind: "p",
              text: "El huésped puede solicitar Ingreso Temprano (Early Check-In) o una Salida Tardía (Late Check-Out) el cual será cobrado de acuerdo a lo estipulado y confirmado en el hotel.",
            },
            {
              kind: "p",
              text: "En caso de llegar con anterioridad a la hora de Ingreso (Check-In), el titular de la reserva y sus acompañantes podrán dejar su equipaje con el personal de la recepción y gozar de las instalaciones abiertas a los huéspedes hasta que sea el momento del Ingreso (Check-In).",
            },
            {
              kind: "p",
              text: "El huésped podrá acceder a las instalaciones del hotel a partir de las 7:30 AM y deberá realizar su salida a más tardar a las 19:30 PM. Para ingresos o salidas fuera de este horario, será necesario coordinar previamente con el hotel, sin que ello afecte los horarios de Check-In y Check-Out estipulados en los presentes términos y condiciones.",
            },
            {
              kind: "p",
              text: "La hora de salida (Check-Out) es a las 11:00 HORAS o 11:00 AM. Los huéspedes cuentan con UNA (01) HORA para realizar la Salida (Check-Out) antes de que empiecen a correr recargos por tardanza, los cuales serán informados y cobrados de acuerdo con los detalles de su estadía.",
            },
          ],
        },
        {
          heading: "POLÍTICA DE INGRESO TEMPRANO (EARLY CHECK-IN) Y SALIDA TARDÍA (LATE CHECK-OUT):",
          blocks: [
            {
              kind: "p",
              text: "Para solicitar un ingreso temprano a la habitación, el titular de la reserva deberá comunicarse con el hotel para solicitarlo con NO MENOS DE 48 HORAS de anticipación. Todas las solicitudes serán estudiadas por el personal y la respuesta se dará por vía electrónica. Las solicitudes realizadas por fuera del término podrán ser negadas de plano por el personal del hotel, de acuerdo con las particularidades del día solicitado.",
            },
            {
              kind: "p",
              text: "Para solicitar una salida tardía, el huésped deberá comunicarse con el personal del hotel con anterioridad a la finalización de su estadía, con un plazo máximo de la última noche de su reserva antes de las 13:00 HORAS o 1:00 PM, el personal del hotel responderá su solicitud de inmediato de acuerdo con la disponibilidad de la fecha de salida.",
            },
            {
              kind: "p",
              text: "Las solicitudes realizadas por fuera del término de las 13:00 HORAS o 1:00 PM, podrán ser rechazadas de plano por el personal del hotel, de acuerdo con las particularidades del día solicitado.",
            },
          ],
        },
        {
          heading: "POLÍTICA DE REGISTRO DE MENORES DE EDAD",
          blocks: [
            {
              kind: "p",
              text: "Si el cliente se presenta en el hotel con menores de 18 años de edad asistiéndole la obligación de informarlo, debe presentar el documento de identificación de los menores (registro civil) que demuestre el parentesco. El hotel se reserva de toda responsabilidad en caso de que no se cuenten con las debidas autorizaciones legales para la estadía de los menores.",
            },
            {
              kind: "p",
              text: "Si los menores de edad no viajan en compañía de sus padres, el cliente, debe entregar en la recepción adicionalmente al documento de identificación del menor (registro civil), el permiso de los padres el cual debe estar autenticado y acompañado de la copia del documento de identificación de quienes dieron la autorización. Sin esta documentación no se permite el ingreso ni reserva de los menores de edad al hotel. Lo anterior en desarrollo a lo dispuesto en la Ley 679 de 2001 Estatuto para Prevenir la Explotación Sexual de Niños, Niñas y Adolescentes y sus normas concordantes.",
            },
          ],
        },
        {
          heading: "POLÍTICAS ADICIONALES DE LA RESERVA",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. no se hará responsable por no poder cumplir o cumplir parcialmente, en servicio, tiempo y demás de la reserva por casos de fuerza mayor, caso fortuito, acciones impredecibles o infranqueables de terceros y de clientes, la no disponibilidad de la red Internet, la incapacidad para acceder al sitio web, la intrusión de virus informáticos como el pago por adelantado no autorizado por el banco del titular de la tarjeta.",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. no es responsable por cualquier reserva o pago que sea irregular, ineficaz, incompleto o fraudulento por cualquier motivo atribuible al cliente supondrá la cancelación del pedido o reserva a cuenta del cliente, sin perjuicio de las acciones legales necesarias contra el cliente o huésped.",
            },
            {
              kind: "p",
              text: "Al efectuar la reserva el huésped o cliente es plena y exclusivamente responsable de la exactitud de todos los datos que suministra o hace constar, en caso de comprobarse inconsistencia o alteraciones anula la reserva.",
            },
          ],
        },
        {
          heading: "POLÍTICA PET FRIENDLY",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S, permite el ingreso de mascotas bajo las siguientes condiciones de estadía, las cuales son de obligatorio cumplimiento por parte de los huéspedes:",
            },
            { kind: "sub", text: "Condiciones Generales:" },
            {
              kind: "list",
              items: [
                "Se aceptará únicamente el ingreso de perros y gatos.",
                "Se aceptan mascotas de hasta 15 kilogramos (30 libras).",
                "Para razas consideradas potencialmente peligrosas, se exigirá el uso obligatorio de bozal, conforme a lo dispuesto en el Código Nacional de Policía vigente en Colombia.",
                "Se aceptará un máximo de una (1) mascota por habitación.",
                "El alojamiento de la mascota tendrá una tarifa por noche, la cual se cobrará bajo los siguientes parámetros:",
                "Para estadías de una sola noche, la tarifa será de $60.000 COP por noche.",
                "A partir de los dos días de hospedaje, la tarifa será de $40.000 COP por noche.",
                "Los huéspedes a cargo de la mascota deberán realizar un depósito preventivo de [$200.000] al momento de ingresar al hotel, con el fin de garantizar la cobertura de posibles daños ocasionados, sin perjuicio de que se cobren valores adicionales en caso de que los daños excedan este valor.",
                "El huésped deberá presentar el carné de vacunación vigente de su mascota, la cual deberá portar una placa de identificación.",
                "El huésped será el único responsable de recoger los desechos de su mascota y de garantizar que esta no cause daños a las instalaciones, otros huéspedes, empleados del hotel o animales presentes en el entorno.",
                "El huésped deberá cumplir con lo dispuesto en el Código Nacional de Policía, especialmente en lo referente a las razas potencialmente peligrosas.",
              ],
            },
            { kind: "sub", text: "Condiciones dentro del Hotel:" },
            {
              kind: "list",
              items: [
                "En las instalaciones del hotel se encuentran animales domésticos, incluyendo perros que pueden ser territoriales. Por lo anterior, es responsabilidad del huésped mantener a su mascota bajo supervisión constante.",
                "Los huéspedes deberán garantizar la seguridad de la fauna y flora local, evitando que su mascota cause daño a animales silvestres o domésticos presentes en el ecosistema, tales como gallinas, perros, gatos, equinos, aves de cualquier tipo, armadillos, perezosos, así como a orquídeas, flores de jardín y cultivos de huerta.",
                "No está permitido bañar a la mascota en los baños de las cabañas, ni utilizar elementos como cristalería, sábanas, camas, cobijas u otra lencería del hotel para su cuidado.",
              ],
            },
            { kind: "sub", text: "Condiciones en la Habitación:" },
            {
              kind: "p",
              text: "El huésped se compromete a informar de manera inmediata cualquier situación que requiera limpieza especial o reparación por daño material dentro de la habitación. Se prohíbe el uso de toallas, sábanas, camas, cobijas o lencería de la habitación para la mascota.",
            },
            { kind: "sub", text: "Política de Salud de las Mascotas:" },
            {
              kind: "p",
              text: "Las mascotas deben cumplir con las regulaciones sanitarias exigidas por la ley y estar libres de parásitos, tales como pulgas, garrapatas y gusanos del corazón. Para su ingreso, se exigirá el carné de vacunación vigente.",
            },
            { kind: "sub", text: "Responsabilidad del Huésped:" },
            {
              kind: "list",
              items: [
                "Los huéspedes con mascotas aceptan la responsabilidad total por cualquier daño a la propiedad del hotel o lesiones personales ocasionadas por su mascota.",
                "Los daños causados por la mascota serán valorados y cargados a la cuenta de la habitación, sin perjuicio del depósito preventivo realizado.",
                "Los huéspedes son responsables de recoger y disponer correctamente los desperdicios de su mascota en las zonas establecidas para tal fin. En caso de utilizar bolsas plásticas, estas deberán ser compostables.",
                "El huésped indemnizará y eximirá de responsabilidad al hotel, sus administradores, propietarios, operadores y colaboradores ante cualquier daño o perjuicio causado por su mascota.",
              ],
            },
          ],
        },
        {
          heading: "POLÍTICA DE SOSTENIBILIDAD TURÍSTICA",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S ha construido e implementado de manera concertada entre los actores internos programas de sostenibilidad ambiental, socio cultural y económicos que cumplen con requisitos legales, mitigan los impactos generados por la prestación de servicios y maximizan los beneficios derivados de las actividades turísticas, por lo cual, manifiesta abiertamente que:",
            },
            {
              kind: "p",
              text: "La educación y protección de los derechos de los niños, niñas y adolescentes hacen parte de la presente política, por eso COFFEE AND ADVENTURE S.A.S rechaza toda práctica relacionada directa e indirectamente con la explotación sexual comercial de los NNA y el trabajo infantil, se han implementado criterios que constituye como un entorno protector con colaboradores capacitados para detectar y activar la ruta de atención y denuncia de este delito (ley 1329 de 2012).",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S Genera empleo en condiciones justas y equitativas con criterios de inclusión social, priorizando las poblaciones locales y vulnerables; oferta en alianza estratégica con entidades de orden nacional procesos de capacitación permanentes para que los colaboradores y las comunidades desarrollen competencias laborales que les permitan escalar laboralmente y mejorar su calidad de vida.",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S monitorea y evalúa periódicamente el desempeño de los programas de sostenibilidad y los procesos de calidad del hotel, buscando siempre la mejora continua, la satisfacción y la generación de beneficios colectivos a las comunidades locales, colaboradores, clientes, proveedores y huéspedes. COFFEE AND ADVENTURE S.A.S trabaja para la comunidad y con la comunidad local para que la estadía en una finca cafetera colombiana sea una experiencia diferencial con sostenibilidad y calidad.",
            },
          ],
        },
      ],
    },
    privacy: {
      title: "Política de tratamiento de datos",
      sections: [
        {
          heading: "POLÍTICA DE PROTECCIÓN DE DATOS PERSONALES",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S (en adelante, «El Hotel») se compromete a desarrollar sus actividades cumpliendo con la Ley 1581 de 2012, el Decreto Reglamentario 1377 de 2013, el Decreto 886 de 2014, y demás normativas que conforman el Régimen de Protección de Datos Personales de Colombia, así como con los más altos estándares aplicables en esta materia. El Hotel garantiza la seguridad de los datos personales de sus clientes, contratistas, proveedores, empleados y del público en general.",
            },
          ],
        },
        {
          heading: "ALCANCE",
          blocks: [
            {
              kind: "p",
              text: "Esta Política es de acceso público, por lo que cualquier persona puede conocer los estándares y procedimientos establecidos por COFFEE AND ADVENTURE S.A.S en relación con el Tratamiento de Datos Personales y la protección de la información contenida en sus Bases de Datos. Todos los trabajadores vinculados a El Hotel deben cumplir con esta Política, al igual que los agentes, representantes, asesores, contratistas y personas que actúen en nombre de la sociedad y realicen Tratamiento de Datos Personales. A estos se les denomina «Personal del Hotel».",
            },
          ],
        },
        {
          heading: "DEFINICIONES",
          blocks: [
            {
              kind: "list",
              items: [
                "Autorización: Consentimiento previo, expreso e informado del Titular para el Tratamiento de Datos Personales.",
                "Base de Datos: Conjunto organizado de Datos Personales en medio digital, electrónico o físico.",
                "Dato Personal: Información que identifica a una persona natural o que puede asociarse a una o varias personas.",
                "Dato Personal Privado: Información reservada que solo concierne al Titular.",
                "Dato Personal Sensible: Datos que afectan la intimidad del Titular y cuyo uso indebido puede generar discriminación (origen racial, orientación política, convicciones religiosas, salud, vida sexual, datos biométricos, etc.).",
                "Dato Público: Información no privada, semiprivada o sensible, como el estado civil, profesión u oficio.",
                "Encargado del Tratamiento: Persona natural o jurídica que realiza el Tratamiento de Datos Personales por cuenta de El Hotel.",
                "Personal del Hotel: Personas vinculadas a COFFEE AND ADVENTURE S.A.S que tratan datos personales.",
                "Responsable del Tratamiento: COFFEE AND ADVENTURE S.A.S, quien decide sobre las finalidades y el Tratamiento de los Datos Personales.",
                "Titular: Persona natural cuyos Datos Personales son objeto de Tratamiento.",
                "Transferencia: Envío de Datos Personales a un responsable del Tratamiento dentro o fuera de Colombia.",
                "Transmisión: Comunicación de Datos Personales dentro o fuera de Colombia por parte del Encargado.",
                "Tratamiento: Operaciones como recolección, almacenamiento, uso, circulación o supresión de Datos Personales.",
              ],
            },
          ],
        },
        {
          heading: "PRINCIPIOS DEL TRATAMIENTO DE DATOS PERSONALES",
          blocks: [
            {
              kind: "list",
              items: [
                "Legalidad: El Tratamiento se ajustará a las leyes colombianas.",
                "Finalidad: El Tratamiento tendrá una finalidad legítima informada al Titular.",
                "Libertad: El Tratamiento requiere consentimiento previo, expreso e informado del Titular.",
                "Veracidad o Calidad: La información será veraz, completa, exacta y actualizada.",
                "Transparencia: El Titular podrá acceder a sus Datos Personales en cualquier momento.",
                "Acceso y Circulación Restringida: Los Datos Personales no estarán disponibles públicamente sin control.",
                "Seguridad: Se implementarán medidas técnicas y administrativas para proteger los datos.",
                "Confidencialidad: El Personal del Hotel garantizará la reserva de los datos.",
              ],
            },
          ],
        },
        {
          heading: "TRATAMIENTO DE DATOS PERSONALES",
          blocks: [
            {
              kind: "p",
              text: "El Titular autoriza a El Hotel para recolectar, almacenar, usar, circular, transmitir y/o transferir sus datos personales al acceder a los servicios del hotel. Esto incluye:",
            },
            {
              kind: "list",
              items: [
                "Registro en la recepción.",
                "Uso de plataformas digitales.",
                "Participación en programas de fidelización.",
                "Contacto para quejas, reclamos o sugerencias.",
                "Captura de imágenes y videos en las instalaciones.",
              ],
            },
            {
              kind: "p",
              text: "El Titular puede ejercer sus derechos a conocer, actualizar, rectificar, oponerse y solicitar la supresión de sus datos. Si no está de acuerdo con el Tratamiento, puede abstenerse de proporcionar sus datos.",
            },
          ],
        },
        {
          heading: "ACCESO A LOS DATOS PERSONALES",
          blocks: [
            {
              kind: "p",
              text: "Los Datos Personales pueden ser compartidos internamente con el Personal del Hotel y, en casos necesarios, con aliados comerciales o proveedores de servicios, siempre cumpliendo con esta Política y las leyes aplicables.",
            },
          ],
        },
        {
          heading: "FINALIDADES DEL TRATAMIENTO",
          blocks: [
            {
              kind: "p",
              text: "El Tratamiento de Datos Personales tiene como finalidad:",
            },
            {
              kind: "list",
              items: [
                "Desarrollar el objeto social de COFFEE AND ADVENTURE S.A.S.",
                "Prestar servicios contratados y mantener informados a los Titulares.",
                "Ejecutar contratos con trabajadores, proveedores y clientes.",
                "Enviar información comercial y publicitaria.",
                "Realizar campañas de satisfacción y evaluar la calidad de los servicios.",
                "Cumplir obligaciones laborales y contractuales.",
                "Realizar estudios estadísticos o contables.",
              ],
            },
          ],
        },
        {
          heading: "COMPROMISO DE PRIVACIDAD Y SEGURIDAD",
          blocks: [
            {
              kind: "p",
              text: "El Hotel garantiza la confidencialidad y seguridad de los Datos Personales, implementando medidas técnicas y administrativas para evitar su adulteración, pérdida o acceso no autorizado.",
            },
          ],
        },
        {
          heading: "TRATAMIENTO DE DATOS PERSONALES DE NIÑOS Y ADOLESCENTES",
          blocks: [
            {
              kind: "p",
              text: "El Hotel no recolecta Datos Personales de menores de 18 años sin la autorización de su representante legal, respetando sus derechos fundamentales y su interés superior.",
            },
          ],
        },
        {
          heading: "TRATAMIENTO DE DATOS SENSIBLES",
          blocks: [
            {
              kind: "p",
              text: "El Hotel evitará el Tratamiento de Datos Sensibles, a menos que sea absolutamente necesario, informando al Titular de manera explícita y previa.",
            },
          ],
        },
        {
          heading: "TRANSMISIÓN DE DATOS PERSONALES",
          blocks: [
            {
              kind: "p",
              text: "En caso de necesitar transmitir Datos Personales a terceros, El Hotel garantizará que estos cumplan con los mismos estándares de protección y seguridad.",
            },
          ],
        },
        {
          heading: "AUTORIZACIÓN DE USO DE IMAGEN",
          blocks: [
            {
              kind: "p",
              text: "El Titular autoriza el uso de su imagen para fines publicitarios y de marketing por parte de El Hotel y sus aliados comerciales.",
            },
          ],
        },
        {
          heading: "LIMITACIONES TEMPORALES AL TRATAMIENTO",
          blocks: [
            {
              kind: "p",
              text: "El Hotel conservará los Datos Personales durante un tiempo razonable después de finalizada la relación contractual, salvo que el Titular solicite su eliminación.",
            },
          ],
        },
        {
          heading: "PROHIBICIÓN O REVOCATORIA DE AUTORIZACIÓN",
          blocks: [
            {
              kind: "p",
              text: "El Titular puede revocar su autorización para el Tratamiento de sus Datos Personales, excepto cuando exista una obligación legal o contractual que lo impida.",
            },
          ],
        },
        {
          heading: "DERECHOS DE LOS TITULARES",
          blocks: [
            {
              kind: "p",
              text: "Los Titulares tienen derecho a:",
            },
            {
              kind: "list",
              items: [
                "Conocer, actualizar y rectificar sus Datos Personales.",
                "Solicitar prueba de la autorización.",
                "Ser informados sobre el uso de sus datos.",
                "Revocar la autorización y solicitar la supresión de sus datos.",
                "Acceder a sus Datos Personales de forma gratuita.",
                "Presentar quejas ante la Superintendencia de Industria y Comercio.",
                "Abstenerse de responder preguntas sobre datos sensibles.",
              ],
            },
          ],
        },
        {
          heading: "PETICIONES O CONSULTAS",
          blocks: [
            {
              kind: "p",
              text: "Las peticiones o consultas deben dirigirse a:",
            },
            {
              kind: "p",
              text: "Correo electrónico: gerenciahotel@lapalmayeltucan.com",
            },
            {
              kind: "p",
              text: "El Hotel responderá en un plazo máximo de 10 días hábiles.",
            },
          ],
        },
        {
          heading: "RECLAMOS",
          blocks: [
            {
              kind: "p",
              text: "Los reclamos deben enviarse a:",
            },
            {
              kind: "p",
              text: "Correo electrónico: gerenciahotel@lapalmayeltucan.com",
            },
            {
              kind: "p",
              text: "El Hotel atenderá el reclamo en un plazo máximo de 15 días hábiles.",
            },
          ],
        },
        {
          heading: "PERSONAS AUTORIZADAS PARA EL SUMINISTRO DE INFORMACIÓN",
          blocks: [
            {
              kind: "p",
              text: "El Hotel solo entregará información a:",
            },
            {
              kind: "list",
              items: [
                "Los Titulares, sus causahabientes o representantes legales.",
                "Entidades públicas o administrativas en ejercicio de sus funciones.",
                "Terceros autorizados por el Titular o por la ley.",
              ],
            },
          ],
        },
        {
          heading: "INFORMACIÓN DE CONTACTO",
          blocks: [
            {
              kind: "list",
              items: [
                "Razón social: COFFEE AND ADVENTURE S.A.S.",
                "NIT: 901.017.282-3",
                "Domicilio: Bogotá, Colombia",
                "Correo electrónico: gerenciahotel@lapalmayeltucan.com",
                "Página Web: https://lapalmayeltucanhotel.com/",
              ],
            },
          ],
        },
        {
          heading: "MODIFICACIÓN DE ESTA POLÍTICA",
          blocks: [
            {
              kind: "p",
              text: "Esta Política puede ser modificada en cualquier momento. Se recomienda revisarla periódicamente en la página web del Hotel.",
            },
          ],
        },
      ],
    },
  },
  en: {
    terms: {
      title: "Terms & Conditions",
      sections: [
        {
          heading: "GENERAL PROVISIONS",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S, identified with NIT 901.514.369-7 and domiciled at Calle 98 No. 7ª-72 in the city of BOGOTÁ D.C., hereby communicates to its clients and users the following TERMS AND CONDITIONS, applicable to the services provided at La Palma y El Tucán Hotel regarding the reservation of rooms and stays at the premises.",
            },
            {
              kind: "p",
              text: "By accessing and/or using the website and/or microsites, as well as by reserving or acquiring any accommodation service from COFFEE AND ADVENTURE S.A.S, the client accepts having read and understood these TERMS AND CONDITIONS, and therefore agrees to abide by them and to comply with all applicable laws and regulations forming part of Colombian legislation, which shall be mandatory for all clients who have acquired a reservation for accommodation or use of the hotel's facilities or enjoyment of the services provided at any of its premises.",
            },
            {
              kind: "p",
              text: "Users who decide to access the site from other countries do so on their own initiative, and it is their responsibility to comply with the local laws applicable to them. Access to the site from territories where its content is illegal is prohibited. If the user does not agree with these TERMS AND CONDITIONS, they must refrain from using the site and waive the right to file claims alleging lack of knowledge of these terms.",
            },
            {
              kind: "p",
              text: "These TERMS AND CONDITIONS are subject to change without prior notice. At any time, COFFEE AND ADVENTURE S.A.S. may modify these TERMS AND CONDITIONS and, as of the date of their modification, all transactions entered into between COFFEE AND ADVENTURE S.A.S. and the user shall be governed by the modified terms and conditions.",
            },
            {
              kind: "p",
              text: "The web portal is managed and administered by COFFEE AND ADVENTURE S.A.S., who makes its website available to visitors and users, who, by using the information, products, services, applications, participating in the activities, or making purchases through it, acknowledge having read, understood, and fully and unreservedly accepted the TERMS AND CONDITIONS described herein. If you do not agree with one or more of the aspects of this document, you must avoid using the portal's services.",
            },
          ],
        },
        {
          heading: "CAPACITY",
          blocks: [
            {
              kind: "p",
              text: "The products and/or services that COFFEE AND ADVENTURE S.A.S. offers through the site are available only to those persons who have the legal capacity to contract and to bind themselves as provided by current Colombian legislation.",
            },
            {
              kind: "p",
              text: "If the user lacks such legal capacity to contract, they may not make use of the products and services offered by the site. COFFEE AND ADVENTURE S.A.S. will examine the request submitted by the user and reserves the right to verify the data communicated by the user. COFFEE AND ADVENTURE S.A.S. assumes no responsibility for any identity impersonation carried out by any user.",
            },
          ],
        },
        {
          heading: "REGISTRATION",
          blocks: [
            {
              kind: "p",
              text: "Prior to the acquisition of the products and/or services that COFFEE AND ADVENTURE S.A.S. offers through the site, the user must complete all the fields of the registration data. The information that the user provides must be accurate and truthful (hereinafter the «Personal Data»).",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. complies with the principles of legality, purpose, freedom, truthfulness or quality, transparency, restricted access and circulation, security, confidentiality, and responsibility established by Statutory Law 1581 of 2012 (hereinafter the «Law»), whose purpose is to set forth the general provisions for the protection of personal data and to develop the constitutional right that all persons have to know, update, and rectify the information collected about them in databases or files, as well as the right to information.",
            },
            {
              kind: "p",
              text: "By accepting the TERMS AND CONDITIONS, the user voluntarily indicates that they know and grant prior authorization to COFFEE AND ADVENTURE S.A.S. so that their personal data may be stored and used in order to achieve efficient communication during the present procedure or activity, and authorizes, under the same terms, that such information may be processed in accordance with the provisions of the Law and its Regulatory Decrees, the foregoing for the purpose of receiving information about its products, services, promotions, alliances, content, studies, and contests, in accordance with the personal data protection policy, published and available on the website, of which the user declares to have been informed, and which includes the inquiry and complaint procedures that allow the user to exercise their rights of access, knowledge, inquiry, rectification, updating, and deletion of the data.",
            },
            {
              kind: "p",
              text: "For more information about the Personal Data collected by the site, its purpose, and the revocation of the authorization for its processing, you may review the personal data protection policy on this website and/or contact us via email at reservations@lapalmayeltucan.com",
            },
          ],
        },
        {
          heading: "USE OF THE SITE",
          blocks: [
            {
              kind: "p",
              text: "By accessing the website, the user is provided access to: texts, graphics, drawings, designs, codes, software, photographs, music, videos, sounds, databases, images, expressions, and information, etc. (hereinafter the «Content») belonging to COFFEE AND ADVENTURE S.A.S.",
            },
            {
              kind: "p",
              text: "Upon accessing the site, the user undertakes to make appropriate use of its content, as well as of the products and/or services offered through it, and therefore, by way of example but not limitation, undertakes NOT to carry out:",
            },
            {
              kind: "list",
              items: [
                "Use of the Content to engage in unlawful or illegal activities or activities contrary to good faith and public order;",
                "Any action through any device, software, or any means to interfere with the activities and operation of COFFEE AND ADVENTURE S.A.S., as well as with the requests, offers, descriptions, accounts, or databases of COFFEE AND ADVENTURE S.A.S.",
                "Any activity that violates or is contrary to intellectual property laws or to these TERMS AND CONDITIONS, and,",
                "Introducing or spreading on the site computer viruses or any other system that may cause damage to the functioning and operation of the site.",
              ],
            },
          ],
        },
        {
          heading: "COPYRIGHT AND INDUSTRIAL PROPERTY:",
          blocks: [
            {
              kind: "p",
              text: "All intellectual property rights of the Content of the site, which by way of example but not limitation include the graphic design, user interfaces, visual interfaces, photographs, sounds, drawings, models, computer code (including HTML code), the layout, design, structure, selection, expression, aesthetic and functional appearance, the logos of the products and/or services offered, the trademarks, industrial designs and models, domain names, account identifiers, or search terms, among others, are the property of COFFEE AND ADVENTURE S.A.S. (or of third parties who have authorized COFFEE AND ADVENTURE S.A.S. to use and/or exploit them) and are protected by the applicable national and international regulations.",
            },
            {
              kind: "p",
              text: "Any act of copying, reproduction, modification, creation of derivative works, sale or distribution, display of the contents, transmission, adaptation, translation, distribution, public communication, including its making-available modality, or any other exploitation and/or total or partial modification of any content included on the site, through any means, including by way of example but not limitation electronic, mechanical, photocopying, or recording means, without prior written authorization from COFFEE AND ADVENTURE S.A.S., is prohibited.",
            },
            {
              kind: "p",
              text: "Under no circumstances do these TERMS AND CONDITIONS confer any license, right, or authorization to carry out the acts described above. Any unauthorized use of the Content shall constitute a violation of these TERMS AND CONDITIONS and of the current regulations on trademarks, copyright, and other applicable national and international intellectual and industrial property regulations.",
            },
            {
              kind: "p",
              text: "The use of discount codes shall not be compatible with certain promotional actions and collections.",
            },
          ],
        },
        {
          heading: "CONTENT PROVIDED BY THE USER:",
          blocks: [
            {
              kind: "p",
              text: "The legitimacy of the intellectual property rights corresponding to the content contributed by the user is the exclusive responsibility of the user, and therefore the user shall hold COFFEE AND ADVENTURE S.A.S. harmless from any third-party claim arising from the unlawful use of content on the site.",
            },
            {
              kind: "p",
              text: "By providing any content (photos, images, etc.) through the site or by any other means, the user freely assigns to COFFEE AND ADVENTURE S.A.S. all intellectual or industrial property rights and any other rights that the user may have over such content. Such rights include the right of reproduction, representation, dissemination, transformation, distribution, and public communication of all or part of the content, by any procedure and in all formats or media.",
            },
          ],
        },
        {
          heading: "AUTHORIZATION FOR THE PROCESSING OF PERSONAL DATA",
          blocks: [
            {
              kind: "p",
              text: "The client or guest authorizes the hotel to process their personal data, delivered or provided through the various marketing channels such as websites, call centers, among others. The hotel informs that personal data will be kept with special care, in accordance with the provisions of Law 1266 of 2008, Law 1581 of 2012, Decree 1377 of 2013, and other regulations related to the matter.",
            },
          ],
        },
        {
          heading: "RESERVATION POLICY",
          blocks: [
            {
              kind: "p",
              text: "All reservations are subject to availability and will be confirmed by email or text message; for the reservation, payment of the total cost of the stay is required in order to guarantee it, which is refundable according to the cancellation terms established below.",
            },
            {
              kind: "p",
              text: "Reservations made through third parties (online travel agencies or others) are subject to the policies and terms of those third parties.",
            },
            {
              kind: "p",
              text: "The client confirms having received from the hotel all the necessary or complementary information for the reservation, the terms, values, validity, conditions, changes, duration of the reservation, and others, including matters related to the facilities, services, location, among others, through the website and other means of communication; therefore, any reservation made through the website and any other means implies that they made the inquiry and fully and without limitations accepted these terms and conditions for any type of reservation.",
            },
            {
              kind: "p",
              text: "Accordingly, the reservation is considered fully accepted by the client or guest, regardless of the means of communication or electronic means by which it was made, approving and assuming its terms and conditions. The reservation is strictly personal and may under no circumstances be transferred under any condition or circumstance to third parties, neither free of charge nor by endorsement or assignment, nor by prior payment or for commercial purposes between the client or guest and said third party.",
            },
            {
              kind: "p",
              text: "In accordance with tourism and hotel regulations and these terms and conditions, every client or guest, upon arrival at the hotel, must proceed to provide and complete the Accommodation Registration Card (Tarjeta de Registro de Alojamiento - TRA); for this, they will provide their identification, permanent address, profession, email, mobile number, and other necessary requirements in accordance with Colombian legislation.",
            },
            {
              kind: "p",
              text: "The prices or rates agreed upon in the reservation indicate the type of room, number of persons, dates and times of Check In and Check Out, and other conditions. The rate or price agreed upon in the reservation settles the value of the stay, as well as the taxes applicable to the hotel service by the Colombian State; regarding the latter, payment must be made prior to check-in.",
            },
            {
              kind: "p",
              text: "The client or guest, at the time of making the reservation, must provide the details of an authorized credit or debit card if the reservation is made through the website. If the reservation is made through other channels, the guest may make the transfer of the corresponding amount or use a payment link provided by The Hotel to formalize the payment, or make a transfer to the bank account certified by The Hotel. Additional consumption and other services must be paid directly at The Hotel, unless they have been previously included in the total value of the reservation.",
            },
            {
              kind: "p",
              text: "If a client or guest reserves several rooms and guarantees payment with a single credit or debit card, either directly or through any payment platform, the payment card associated and presented as a deposit shall serve as a guarantee for all the rooms reserved by said client or guest.",
            },
            {
              kind: "p",
              text: "If the guest pays for their reservation in a currency other than the Colombian peso, the value of the reservation will be settled at the official exchange rate of the foreign currency against the Colombian peso.",
            },
            {
              kind: "p",
              text: "Guests accept and undertake to use their room in a respectful and responsible manner; therefore, any conduct contrary to the rules of good coexistence, behavior, public order, and others shall lead the hotel to request that the guest who directly or indirectly has breached such regulations leave the hotel premises without compensation or refund in the event that payment has already been made; if no payment has been made, the guest must pay the price of the nights of stay already enjoyed before leaving the hotel, without such breach being able to lead to other legal actions.",
            },
          ],
        },
        {
          heading: "CANCELLATION POLICY",
          blocks: [
            {
              kind: "p",
              text: "Guests must contact the hotel directly to cancel or modify their reservations. They can contact the line +57 311 444 1453 and the email address reservations@lapalmayeltucan.com to facilitate this process.",
            },
            {
              kind: "p",
              text: "Likewise, modifications to reservation dates are subject to availability and may be subject to additional charges. Any change in the type of room or package must be requested sufficiently in advance, no less than 7 days beforehand, and will be subject to the hotel's approval.",
            },
            {
              kind: "p",
              text: "The guest may cancel without additional charges up to a minimum of 7 business days before the arrival date; in this case, for purposes of refunding the payment made, only a charge of 6% of the total value of the reservation will be applied for administrative and banking expenses, as well as the 4x1000 (financial transactions tax), an amount that will depend on the specific amount of each reservation. This charge covers the costs associated with processing the reservation and any banking transaction carried out for the refund. The specific amount of these charges will be detailed in the cancellation confirmation.",
            },
            {
              kind: "p",
              text: "In the event of late cancellation, an amount equivalent to 100% of the charges of your reservation will be charged. In the event of no-show, the total amount of the reservation will be charged.",
            },
            {
              kind: "p",
              text: "During periods of high demand or special events, cancellation must be made 7 days in advance to avoid additional charges. Cancellation charges during these periods may be higher and will be specified at the time of making the reservation.",
            },
            {
              kind: "p",
              text: "In cases of force majeure or unforeseen circumstances, the hotel may consider exceptions to the cancellation policy. Guests must contact the hotel as soon as possible to discuss any exceptional situation and provide the corresponding supporting documentation of force majeure or unforeseen events.",
            },
            {
              kind: "p",
              text: "Refunds will be processed within 15 business days after cancellation and will be carried out in accordance with the established cancellation policy.",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. reserves the right to make changes to this policy without prior notice.",
            },
          ],
        },
        {
          heading: "HOTEL CHECK-IN AND CHECK-OUT POLICY (CHECK-IN/CHECK-OUT)",
          blocks: [
            {
              kind: "p",
              text: "Check-In is available from 15:00 HOURS or 3:00 PM on the scheduled arrival day. Guests must present valid identification (identity document or passport). Every foreign client who requests a reservation or presents themselves at the hotel, without exception, including foreign minors, must mandatorily present their corresponding personal and family documentation, that is, the passport or the required documents, in accordance with the regulations of the Colombian State for foreigners regarding their stay.",
            },
            {
              kind: "p",
              text: "The guest may request Early Check-In or Late Check-Out, which will be charged in accordance with what is stipulated and confirmed at the hotel.",
            },
            {
              kind: "p",
              text: "In the event of arriving before the Check-In time, the holder of the reservation and their companions may leave their luggage with the reception staff and enjoy the facilities open to guests until the time of Check-In.",
            },
            {
              kind: "p",
              text: "The guest may access the hotel facilities from 7:30 AM and must leave no later than 19:30 PM. For entries or departures outside this schedule, it will be necessary to coordinate in advance with the hotel, without this affecting the Check-In and Check-Out times stipulated in these terms and conditions.",
            },
            {
              kind: "p",
              text: "The check-out time is 11:00 HOURS or 11:00 AM. Guests have ONE (01) HOUR to complete Check-Out before late charges begin to accrue, which will be reported and charged according to the details of their stay.",
            },
          ],
        },
        {
          heading: "EARLY CHECK-IN AND LATE CHECK-OUT POLICY:",
          blocks: [
            {
              kind: "p",
              text: "To request an early check-in to the room, the holder of the reservation must contact the hotel to request it NO LESS THAN 48 HOURS in advance. All requests will be reviewed by the staff, and the response will be given electronically. Requests made outside this time frame may be denied outright by the hotel staff, in accordance with the particularities of the requested day.",
            },
            {
              kind: "p",
              text: "To request a late check-out, the guest must contact the hotel staff prior to the end of their stay, with a deadline of the last night of their reservation before 13:00 HOURS or 1:00 PM; the hotel staff will respond to their request immediately according to the availability of the departure date.",
            },
            {
              kind: "p",
              text: "Requests made outside the time frame of 13:00 HOURS or 1:00 PM may be rejected outright by the hotel staff, in accordance with the particularities of the requested day.",
            },
          ],
        },
        {
          heading: "POLICY ON REGISTRATION OF MINORS",
          blocks: [
            {
              kind: "p",
              text: "If the client presents themselves at the hotel with minors under 18 years of age, having the obligation to report it, they must present the identification document of the minors (civil registry) demonstrating the relationship. The hotel reserves itself from all responsibility in the event that the proper legal authorizations for the stay of the minors are not available.",
            },
            {
              kind: "p",
              text: "If the minors are not traveling in the company of their parents, the client must deliver at reception, in addition to the minor's identification document (civil registry), the parents' permission, which must be authenticated and accompanied by a copy of the identification document of those who gave the authorization. Without this documentation, the entry or reservation of minors at the hotel is not permitted. The foregoing is in accordance with the provisions of Law 679 of 2001, Statute to Prevent the Sexual Exploitation of Children and Adolescents, and its related regulations.",
            },
          ],
        },
        {
          heading: "ADDITIONAL RESERVATION POLICIES",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. shall not be held responsible for being unable to fulfill or only partially fulfilling, in service, time, and other aspects of the reservation, due to cases of force majeure, fortuitous events, unpredictable or insurmountable actions by third parties and clients, the unavailability of the Internet network, the inability to access the website, the intrusion of computer viruses, as well as advance payment not authorized by the cardholder's bank.",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S. is not responsible for any reservation or payment that is irregular, ineffective, incomplete, or fraudulent; for any reason attributable to the client, this shall entail the cancellation of the order or reservation at the client's expense, without prejudice to the necessary legal actions against the client or guest.",
            },
            {
              kind: "p",
              text: "When making the reservation, the guest or client is fully and exclusively responsible for the accuracy of all the data they provide or state; in the event that inconsistency or alterations are verified, the reservation is voided.",
            },
          ],
        },
        {
          heading: "PET-FRIENDLY POLICY",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S permits the entry of pets under the following conditions of stay, which are mandatory for guests:",
            },
            { kind: "sub", text: "General Conditions:" },
            {
              kind: "list",
              items: [
                "Only the entry of dogs and cats will be accepted.",
                "Pets of up to 15 kilograms (30 pounds) are accepted.",
                "For breeds considered potentially dangerous, the mandatory use of a muzzle will be required, in accordance with the provisions of the National Police Code (Código Nacional de Policía) in force in Colombia.",
                "A maximum of one (1) pet per room will be accepted.",
                "The accommodation of the pet will have a per-night rate, which will be charged under the following parameters:",
                "For single-night stays, the rate will be $60.000 COP per night.",
                "From the second day of lodging onward, the rate will be $40.000 COP per night.",
                "Guests in charge of the pet must make a preventive deposit of [$200.000] upon entering the hotel, in order to guarantee coverage of possible damages caused, without prejudice to additional amounts being charged in the event that the damages exceed this value.",
                "The guest must present the current vaccination card of their pet, which must wear an identification tag.",
                "The guest will be solely responsible for collecting their pet's waste and for ensuring that it does not cause damage to the facilities, other guests, hotel employees, or animals present in the environment.",
                "The guest must comply with the provisions of the National Police Code, especially with regard to potentially dangerous breeds.",
              ],
            },
            { kind: "sub", text: "Conditions within the Hotel:" },
            {
              kind: "list",
              items: [
                "On the hotel premises there are domestic animals, including dogs that may be territorial. Therefore, it is the guest's responsibility to keep their pet under constant supervision.",
                "Guests must ensure the safety of the local fauna and flora, preventing their pet from causing harm to wild or domestic animals present in the ecosystem, such as hens, dogs, cats, horses, birds of any kind, armadillos, sloths, as well as orchids, garden flowers, and vegetable garden crops.",
                "It is not permitted to bathe the pet in the bathrooms of the cabins, nor to use items such as glassware, sheets, beds, blankets, or other hotel linens for its care.",
              ],
            },
            { kind: "sub", text: "Conditions in the Room:" },
            {
              kind: "p",
              text: "The guest undertakes to immediately report any situation requiring special cleaning or repair due to material damage within the room. The use of towels, sheets, beds, blankets, or room linens for the pet is prohibited.",
            },
            { kind: "sub", text: "Pet Health Policy:" },
            {
              kind: "p",
              text: "Pets must comply with the sanitary regulations required by law and be free of parasites, such as fleas, ticks, and heartworms. For entry, the current vaccination card will be required.",
            },
            { kind: "sub", text: "Guest Responsibility:" },
            {
              kind: "list",
              items: [
                "Guests with pets accept full responsibility for any damage to hotel property or personal injuries caused by their pet.",
                "Damages caused by the pet will be assessed and charged to the room account, without prejudice to the preventive deposit made.",
                "Guests are responsible for collecting and properly disposing of their pet's waste in the areas established for that purpose. In the event of using plastic bags, these must be compostable.",
                "The guest shall indemnify and hold harmless the hotel, its administrators, owners, operators, and collaborators against any damage or harm caused by their pet.",
              ],
            },
          ],
        },
        {
          heading: "TOURISM SUSTAINABILITY POLICY",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S has built and implemented, in a concerted manner among internal stakeholders, environmental, sociocultural, and economic sustainability programs that comply with legal requirements, mitigate the impacts generated by the provision of services, and maximize the benefits derived from tourism activities, for which it openly declares that:",
            },
            {
              kind: "p",
              text: "The education and protection of the rights of children and adolescents are part of this policy; therefore, COFFEE AND ADVENTURE S.A.S rejects all practices related directly and indirectly to the commercial sexual exploitation of children and adolescents (NNA) and child labor; criteria have been implemented that constitute it as a protective environment with collaborators trained to detect and activate the route of attention and reporting of this crime (Law 1329 of 2012).",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S generates employment under fair and equitable conditions with social inclusion criteria, prioritizing local and vulnerable populations; in strategic alliance with national entities, it offers ongoing training processes so that collaborators and communities develop labor competencies that allow them to advance professionally and improve their quality of life.",
            },
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S periodically monitors and evaluates the performance of the sustainability programs and the hotel's quality processes, always seeking continuous improvement, satisfaction, and the generation of collective benefits for local communities, collaborators, clients, suppliers, and guests. COFFEE AND ADVENTURE S.A.S works for the community and with the local community so that the stay at a Colombian coffee farm is a differential experience with sustainability and quality.",
            },
          ],
        },
      ],
    },
    privacy: {
      title: "Data Processing Policy",
      sections: [
        {
          heading: "PERSONAL DATA PROTECTION POLICY",
          blocks: [
            {
              kind: "p",
              text: "COFFEE AND ADVENTURE S.A.S (hereinafter, «The Hotel») undertakes to carry out its activities in compliance with Law 1581 of 2012, Regulatory Decree 1377 of 2013, Decree 886 of 2014, and other regulations that make up the Personal Data Protection Regime of Colombia, as well as with the highest applicable standards in this matter. The Hotel guarantees the security of the personal data of its clients, contractors, suppliers, employees, and the general public.",
            },
          ],
        },
        {
          heading: "SCOPE",
          blocks: [
            {
              kind: "p",
              text: "This Policy is publicly accessible, so that any person may learn the standards and procedures established by COFFEE AND ADVENTURE S.A.S in relation to the Processing of Personal Data and the protection of the information contained in its Databases. All workers linked to The Hotel must comply with this Policy, as must the agents, representatives, advisors, contractors, and persons who act on behalf of the company and carry out the Processing of Personal Data. These are referred to as «Hotel Personnel».",
            },
          ],
        },
        {
          heading: "DEFINITIONS",
          blocks: [
            {
              kind: "list",
              items: [
                "Authorization: Prior, express, and informed consent of the Data Subject for the Processing of Personal Data.",
                "Database: Organized set of Personal Data in digital, electronic, or physical form.",
                "Personal Data: Information that identifies a natural person or that can be associated with one or several persons.",
                "Private Personal Data: Reserved information that concerns only the Data Subject.",
                "Sensitive Personal Data: Data that affect the privacy of the Data Subject and whose improper use may generate discrimination (racial origin, political orientation, religious convictions, health, sexual life, biometric data, etc.).",
                "Public Data: Information that is not private, semi-private, or sensitive, such as marital status, profession, or occupation.",
                "Data Processor (Encargado del Tratamiento): Natural or legal person who carries out the Processing of Personal Data on behalf of The Hotel.",
                "Hotel Personnel: Persons linked to COFFEE AND ADVENTURE S.A.S who process personal data.",
                "Data Controller (Responsable del Tratamiento): COFFEE AND ADVENTURE S.A.S, who decides on the purposes and the Processing of Personal Data.",
                "Data Subject (Titular): Natural person whose Personal Data are subject to Processing.",
                "Transfer: Sending of Personal Data to a data controller within or outside Colombia.",
                "Transmission: Communication of Personal Data within or outside Colombia by the Data Processor.",
                "Processing: Operations such as collection, storage, use, circulation, or deletion of Personal Data.",
              ],
            },
          ],
        },
        {
          heading: "PRINCIPLES OF PERSONAL DATA PROCESSING",
          blocks: [
            {
              kind: "list",
              items: [
                "Legality: The Processing shall conform to Colombian laws.",
                "Purpose: The Processing shall have a legitimate purpose informed to the Data Subject.",
                "Freedom: The Processing requires the prior, express, and informed consent of the Data Subject.",
                "Truthfulness or Quality: The information shall be truthful, complete, accurate, and up to date.",
                "Transparency: The Data Subject may access their Personal Data at any time.",
                "Restricted Access and Circulation: Personal Data shall not be publicly available without control.",
                "Security: Technical and administrative measures shall be implemented to protect the data.",
                "Confidentiality: Hotel Personnel shall guarantee the confidentiality of the data.",
              ],
            },
          ],
        },
        {
          heading: "PROCESSING OF PERSONAL DATA",
          blocks: [
            {
              kind: "p",
              text: "The Data Subject authorizes The Hotel to collect, store, use, circulate, transmit, and/or transfer their personal data when accessing the hotel's services. This includes:",
            },
            {
              kind: "list",
              items: [
                "Registration at reception.",
                "Use of digital platforms.",
                "Participation in loyalty programs.",
                "Contact for complaints, claims, or suggestions.",
                "Capture of images and videos on the premises.",
              ],
            },
            {
              kind: "p",
              text: "The Data Subject may exercise their rights to know, update, rectify, object to, and request the deletion of their data. If they do not agree with the Processing, they may refrain from providing their data.",
            },
          ],
        },
        {
          heading: "ACCESS TO PERSONAL DATA",
          blocks: [
            {
              kind: "p",
              text: "Personal Data may be shared internally with Hotel Personnel and, in necessary cases, with commercial partners or service providers, always complying with this Policy and the applicable laws.",
            },
          ],
        },
        {
          heading: "PURPOSES OF PROCESSING",
          blocks: [
            {
              kind: "p",
              text: "The Processing of Personal Data has the following purposes:",
            },
            {
              kind: "list",
              items: [
                "To develop the corporate purpose of COFFEE AND ADVENTURE S.A.S.",
                "To provide contracted services and keep Data Subjects informed.",
                "To execute contracts with workers, suppliers, and clients.",
                "To send commercial and advertising information.",
                "To carry out satisfaction campaigns and evaluate the quality of services.",
                "To comply with labor and contractual obligations.",
                "To carry out statistical or accounting studies.",
              ],
            },
          ],
        },
        {
          heading: "PRIVACY AND SECURITY COMMITMENT",
          blocks: [
            {
              kind: "p",
              text: "The Hotel guarantees the confidentiality and security of Personal Data, implementing technical and administrative measures to prevent its adulteration, loss, or unauthorized access.",
            },
          ],
        },
        {
          heading: "PROCESSING OF PERSONAL DATA OF CHILDREN AND ADOLESCENTS",
          blocks: [
            {
              kind: "p",
              text: "The Hotel does not collect Personal Data of minors under 18 years of age without the authorization of their legal representative, respecting their fundamental rights and their best interest.",
            },
          ],
        },
        {
          heading: "PROCESSING OF SENSITIVE DATA",
          blocks: [
            {
              kind: "p",
              text: "The Hotel will avoid the Processing of Sensitive Data, unless it is absolutely necessary, informing the Data Subject explicitly and in advance.",
            },
          ],
        },
        {
          heading: "TRANSMISSION OF PERSONAL DATA",
          blocks: [
            {
              kind: "p",
              text: "In the event of needing to transmit Personal Data to third parties, The Hotel will guarantee that they comply with the same standards of protection and security.",
            },
          ],
        },
        {
          heading: "AUTHORIZATION FOR THE USE OF IMAGE",
          blocks: [
            {
              kind: "p",
              text: "The Data Subject authorizes the use of their image for advertising and marketing purposes by The Hotel and its commercial partners.",
            },
          ],
        },
        {
          heading: "TEMPORARY LIMITATIONS ON PROCESSING",
          blocks: [
            {
              kind: "p",
              text: "The Hotel will retain Personal Data for a reasonable time after the end of the contractual relationship, unless the Data Subject requests its deletion.",
            },
          ],
        },
        {
          heading: "PROHIBITION OR REVOCATION OF AUTHORIZATION",
          blocks: [
            {
              kind: "p",
              text: "The Data Subject may revoke their authorization for the Processing of their Personal Data, except when there is a legal or contractual obligation that prevents it.",
            },
          ],
        },
        {
          heading: "RIGHTS OF DATA SUBJECTS",
          blocks: [
            {
              kind: "p",
              text: "Data Subjects have the right to:",
            },
            {
              kind: "list",
              items: [
                "Know, update, and rectify their Personal Data.",
                "Request proof of the authorization.",
                "Be informed about the use of their data.",
                "Revoke the authorization and request the deletion of their data.",
                "Access their Personal Data free of charge.",
                "File complaints before the Superintendence of Industry and Commerce (Superintendencia de Industria y Comercio).",
                "Refrain from answering questions about sensitive data.",
              ],
            },
          ],
        },
        {
          heading: "REQUESTS OR INQUIRIES",
          blocks: [
            {
              kind: "p",
              text: "Requests or inquiries must be addressed to:",
            },
            {
              kind: "p",
              text: "Email: gerenciahotel@lapalmayeltucan.com",
            },
            {
              kind: "p",
              text: "The Hotel will respond within a maximum period of 10 business days.",
            },
          ],
        },
        {
          heading: "CLAIMS",
          blocks: [
            {
              kind: "p",
              text: "Claims must be sent to:",
            },
            {
              kind: "p",
              text: "Email: gerenciahotel@lapalmayeltucan.com",
            },
            {
              kind: "p",
              text: "The Hotel will address the claim within a maximum period of 15 business days.",
            },
          ],
        },
        {
          heading: "PERSONS AUTHORIZED TO PROVIDE INFORMATION",
          blocks: [
            {
              kind: "p",
              text: "The Hotel will only provide information to:",
            },
            {
              kind: "list",
              items: [
                "The Data Subjects, their successors, or legal representatives.",
                "Public or administrative entities in the exercise of their functions.",
                "Third parties authorized by the Data Subject or by law.",
              ],
            },
          ],
        },
        {
          heading: "CONTACT INFORMATION",
          blocks: [
            {
              kind: "list",
              items: [
                "Company name: COFFEE AND ADVENTURE S.A.S.",
                "NIT: 901.017.282-3",
                "Address: Bogotá, Colombia",
                "Email: gerenciahotel@lapalmayeltucan.com",
                "Website: https://lapalmayeltucanhotel.com/",
              ],
            },
          ],
        },
        {
          heading: "MODIFICATION OF THIS POLICY",
          blocks: [
            {
              kind: "p",
              text: "This Policy may be modified at any time. It is recommended to review it periodically on the Hotel's website.",
            },
          ],
        },
      ],
    },
  },
};
