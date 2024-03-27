{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv.url = "github:cachix/devenv";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.devenv.flakeModule
      ];

      systems = [ "x86_64-linux" "x86_64-darwin" "aarch64-darwin" ];

      perSystem = { config, self', inputs', pkgs, system, ... }: rec {
        _module.args.pkgs = import inputs.nixpkgs {
          inherit system;
        };

        devenv.shells = {
          default = {
            languages = {
              javascript = {
                enable = true;
                package = pkgs.nodejs_20;
              };
            };

            pre-commit.hooks = {
              nixpkgs-fmt.enable = true;
            };

            packages = with pkgs; [
              gnumake
              mage

              curl
              jq
              kind
              kubectl

              # node
              nodePackages.npm
            ];

            env = {
              KUBECONFIG = "${config.devenv.shells.default.env.DEVENV_STATE}/kube/config";
              KIND_CLUSTER_NAME = "northe";

              HELM_CACHE_HOME = "${config.devenv.shells.default.env.DEVENV_STATE}/helm/cache";
              HELM_CONFIG_HOME = "${config.devenv.shells.default.env.DEVENV_STATE}/helm/config";
              HELM_DATA_HOME = "${config.devenv.shells.default.env.DEVENV_STATE}/helm/data";
            };

            # https://github.com/cachix/devenv/issues/528#issuecomment-1556108767
            containers = pkgs.lib.mkForce { };
          };

          ci = devenv.shells.default;
        };

        packages = {
        };
      };
    };
}