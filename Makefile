# A Self-Documenting Makefile: http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html

.PHONY: up
up: ## Start the dependencies via docker compose
	$(call print-target)
	docker compose up -d

.PHONY: down
down: ## Stop the dependencies via docker compose
	$(call print-target)
	docker compose down --remove-orphans --volumes

.PHONY: dev
dev: ## Start the development environment
	$(call print-target)
	npx concurrently "npm run dev:be" "npm run dev:fe"

.PHONY: localstack
localstack: ## Start the dependencies via docker compose
	$(call print-target)
	docker compose --profile localstack up --build

.PHONY: lint
lint: ## Run linting
	$(call print-target)
	npm run lint

.PHONY: test
test: ## Run tests
	$(call print-target)
	npm run test:be

.PHONY: help
.DEFAULT_GOAL := help
help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Variable outputting/exporting rules
var-%: ; @echo $($*)
varexport-%: ; @echo $*=$($*)

define print-target
    @printf "Executing target: \033[36m$@\033[0m\n"
endef
