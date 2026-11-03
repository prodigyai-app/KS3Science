"""Original 15-mark end-of-unit tests: three 1-mark multiple-choice questions, then written questions worth 2, 3, 3 and 4 marks."""
TESTS={}
def U(title,mcq,parts):
 assert len(mcq)==3 and len(parts)==4,title
 for (q,ms),m in zip(parts,(2,3,3,4)):assert len(ms.split('~'))==m,(title,q)
 TESTS[title]=dict(mcq=mcq,parts=parts)

import tests_y7  # noqa: E402,F401
import tests_y8  # noqa: E402,F401
import tests_y9  # noqa: E402,F401
