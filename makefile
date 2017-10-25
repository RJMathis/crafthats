.DEFAULT_GOAL := all

FILES :=            \
    collatz-tests   \
    Collatz.html    \
    Collatz.log     \
    Collatz.py      \
    RunCollatz.in   \
    RunCollatz.out  \
    RunCollatz.py   \
    TestCollatz.out \
    TestCollatz.py

# uncomment these:
#    .travis.yml                           \
#    collatz-tests/GitHubID-RunCollatz.in  \
#    collatz-tests/GitHubID-RunCollatz.out \
ifeq ($(shell uname), Darwin)          # Apple
    PYTHON   := python3
    PIP      := pip
    MYPY     := mypy
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := pydoc
    AUTOPEP8 := autopep8
else ifeq ($(CI), true)                # Travis CI
    PYTHON   := python3.5
    PIP      := pip3.5
    MYPY     := mypy
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3
    AUTOPEP8 := autopep8
else ifeq ($(shell uname -p), unknown) # Docker
    PYTHON   := python3.5
    PIP      := pip3.5
    MYPY     := mypy
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    MYPY     := mypy
    PYLINT   := pylint3
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
endif

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

collatz-tests:
	git clone https://github.com/cs373t-summer-2017/collatz-tests.git

Collatz.html: Collatz.py
	$(PYDOC) -w Collatz

Collatz.log:
	git log > Collatz.log

RunCollatz.pyx: Collatz.py RunCollatz.py .pylintrc
	-$(MYPY)   Collatz.py
	-$(PYLINT) Collatz.py
	-$(MYPY)   RunCollatz.py
	-$(PYLINT) RunCollatz.py
	$(PYTHON)  RunCollatz.py < RunCollatz.in > RunCollatz.tmp
	-diff RunCollatz.tmp RunCollatz.out

TestCollatz.pyx: Collatz.py TestCollatz.py .pylintrc
	-$(MYPY)     TestCollatz.py
	-$(PYLINT)   TestCollatz.py
	-$(COVERAGE) run    --branch TestCollatz.py
	-$(COVERAGE) report -m

all:

check: $(FILES)

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
	rm -rf __pycache__
	rm -rf .mypy_cache

config:
	git config -l

docker:
	docker run -it -v $(PWD):/usr/collatz -w /usr/collatz gpdowning/python

format:
	$(AUTOPEP8) -i Collatz.py
	$(AUTOPEP8) -i RunCollatz.py
	$(AUTOPEP8) -i TestCollatz.py

run: RunCollatz.pyx TestCollatz.pyx

scrub:
	make clean
	rm -f  Collatz.html
	rm -f  Collatz.log
	rm -rf collatz-tests

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

travis: collatz-tests Collatz.html Collatz.log
	make clean
	ls -al
	make run
	ls -al
	make -r check

versions:
	which cmake
	cmake --version
	@echo
	which make
	make --version
	@echo
	which git
	git --version
	@echo
	which $(PYTHON)
	$(PYTHON) --version
	@echo
	which $(PIP)
	$(PIP) --version
	@echo
	which $(MYPY)
	$(MYPY) --version
	@echo
	which $(PYLINT)
	$(PYLINT) --version
	@echo
	which $(COVERAGE)
	$(COVERAGE) --version
	@echo
	which $(PYDOC)
	@echo
	which $(AUTOPEP8)
	$(AUTOPEP8) --version
