# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `quantitySelectorStep` prop to `product-quantity` and `product-summary-quantity`. Enables users to see the quantity of products affected with the unitMultiplier like units.

## [1.6.0] - 2021-01-13
### Added
- Added prop `showUnit` to show or hide unit on `quantity-selector`

## [1.5.0] - 2020-10-27
### Added
- `selectorType` prop to `product-quantity` and `product-summary-quantity`. Enables users to toggle between a dropdown and a numeric stepper.

## [1.4.1] - 2020-05-01
### Fixed
- Fix SSR and consider that selectedItem might be undefined.
- Add fallback values to `measurementUnit` and `unitMultiplier`.

## [1.4.0] - 2020-04-28

### Added
- Show `measurementUnit` if it's different from the default.
- Handle `unitMultiplier`.

## [1.3.2] - 2020-04-06
### Fixed
- `product-summary-quantity` not working.
- Remove changes of `1.3.1`.

## [1.3.1] - 2020-04-03
### Fixed
- Component not working in `product-summary`.

### Security
- Bump versions of dependencies.

## [1.3.0] - 2020-03-03
### Added
- `showLabel` and `size` props.

## [1.2.1] - 2019-12-05
### Changed
- Updated documentation.

## [1.2.0] - 2019-12-03
### Added
- New CSS handles.

## [1.1.2] - 2019-10-28
### Chore
- Rebuild to enable lazy evaluation of product-quantity entrypoints.

## [1.1.1] - 2019-08-29

## [1.1.0] - 2019-08-27
### Changed
- how `ProductQuantity` worked. Now it is possible for it to receive `selectedItem` and `selectedQuantity` from external sources.

### Added
- `BaseProductQuantity` that contains the core logic of `ProductQuantity`
- `ProductSummaryQuantity`

## [1.0.3] - 2019-07-02
### Fixed
- Issue updating quantity because of the way of consuming the dispatch function.

## [1.0.2] - 2019-06-26

### Changed

- Use selectedQuantity from state of Product Page.

## [1.0.1] - 2019-06-03

### Fixed

- Add missing translations.

## [1.0.0] - 2019-06-03

### Added

- Initial release.
