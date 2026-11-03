"""Extra original KS3 content: a third note, four more quiz questions and a three-step practice ladder per concept,
plus extra interactive models. Ladder marks: Remember 1, Apply 2, Explain 3 (one mark per scheme point)."""
X={}
def ex(key,note,quiz,ladder):
 assert len(quiz)==4 and len(ladder)==3,key
 for (q,ms),m in zip(ladder,(1,2,3)):assert len(ms.split('~'))==m,(key,q)
 X[key]=dict(note=note,quiz=quiz,ladder=ladder)

MODELS={'speed':'race','dt':'race','pressure':'shoes','foodweb':'populations','ecosystem':'populations','catalyst':'rate','chemical-energy':'rate','acid':'ph','neutral':'ph','orbits':'seasons','electromagnet':'electromagnet','magnet':'electromagnet','rock-cycle':'rockcycle','sediment':'rockcycle','lungs':'breathing','power':'bill','efficiency':'bill'}

from extras_a import *  # noqa: E402,F401,F403  (each module calls ex())
from extras_b import *  # noqa
from extras_c import *  # noqa
from extras_d import *  # noqa
from extras_e import *  # noqa
from extras_f import *  # noqa
from extras_g import *  # noqa
