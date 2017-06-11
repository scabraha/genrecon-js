import extractMappingFunctions from '../../src/extractors/MappingFunctionExtractors';
import { DECLARATION_TYPES, ARG_TYPES } from '../../src/constants/EsprimaConstants';

describe('Mapping Function Extractors', () => {
  it('returns an empty object if there is nothing is provided', () => {
    expect(extractMappingFunctions()).toEqual({});
  });

  it('returns an empty object if an array is not provided', () => {
    expect(extractMappingFunctions({})).toEqual({});
  });

  it('returns an empty object if there is no default export statement', () => {
    expect(extractMappingFunctions([{ type: 'Invalid Type' }])).toEqual({});
  });

  it('returns an empty object if the default export statment is malformed', () => {
    expect(extractMappingFunctions([{ type: DECLARATION_TYPES.DEFAULT_EXPORT }])).toEqual({});

    expect(extractMappingFunctions([{
      type: DECLARATION_TYPES.DEFAULT_EXPORT,
      declaration: {}
    }])).toEqual({});

    expect(extractMappingFunctions([{
      type: DECLARATION_TYPES.DEFAULT_EXPORT,
      declaration: {
        callee: {}
      }
    }])).toEqual({});
  });

  it('returns an empty object when no argument type is found for mapStateToProps', () => {
    expect(extractMappingFunctions([{
      type: DECLARATION_TYPES.DEFAULT_EXPORT,
      declaration: { callee: { arguments: [{ name: 'expectedFunction' }] } }
    }])).toEqual({});
  });

  it('returns an empty object when no mapStateToProps declaration is found', () => {
    expect(extractMappingFunctions([{
      type: DECLARATION_TYPES.DEFAULT_EXPORT,
      declaration: {
        callee: {
          arguments: [{ type: ARG_TYPES.IDENTIFIER, name: 'expectedFunction' }]
        }
      }
    }])).toEqual({});

    expect(extractMappingFunctions([
      {
        type: DECLARATION_TYPES.DEFAULT_EXPORT,
        declaration: {
          callee: {
            arguments: [{ type: ARG_TYPES.IDENTIFIER, name: 'expectedFunction' }]
          }
        }
      },
      {
        type: DECLARATION_TYPES.VAR_DECLARATION
      }
    ])).toEqual({});

    expect(extractMappingFunctions([
      {
        type: DECLARATION_TYPES.DEFAULT_EXPORT,
        declaration: {
          callee: {
            arguments: [{ type: ARG_TYPES.IDENTIFIER, name: 'expectedFunction' }]
          }
        }
      },
      {
        type: DECLARATION_TYPES.VAR_DECLARATION,
        declarations: [{}]
      }
    ])).toEqual({});

    expect(extractMappingFunctions([
      {
        type: DECLARATION_TYPES.DEFAULT_EXPORT,
        declaration: {
          callee: {
            arguments: [{ type: ARG_TYPES.IDENTIFIER, name: 'expectedFunction' }]
          }
        }
      },
      {
        type: DECLARATION_TYPES.VAR_DECLARATION,
        declarations: [{ id: 'INVALID' }]
      }
    ])).toEqual({});
  });

  it('returns the mapStateToProps declaration when its defined', () => {
    const expected = {
      type: DECLARATION_TYPES.VAR_DECLARATION,
      declarations: [{ id: { name: 'expectedFunction' } }]
    };

    expect(extractMappingFunctions([
      {
        type: DECLARATION_TYPES.DEFAULT_EXPORT,
        declaration: {
          callee: {
            arguments: [{ type: ARG_TYPES.IDENTIFIER, name: 'expectedFunction' }]
          }
        }
      },
      expected
    ])).toEqual({ mapStateToProps: expected });
  });

  it('returns the function declarations when mapDispatchToProps is defined', () => {
    const expected = {
      type: DECLARATION_TYPES.VAR_DECLARATION,
      declarations: [{ id: { name: 'expectedFunction' } }]
    };

    expect(extractMappingFunctions([
      {
        type: DECLARATION_TYPES.DEFAULT_EXPORT,
        declaration: {
          callee: {
            arguments: [
              { type: 'INVALID' },
              { type: ARG_TYPES.IDENTIFIER, name: 'expectedFunction' }
            ]
          }
        }
      },
      expected
    ])).toEqual({ mapDispatchToProps: expected });
  });

  it('returns the function declarations when both are defined', () => {
    const expectedMapState = {
      type: DECLARATION_TYPES.VAR_DECLARATION,
      declarations: [{ id: { name: 'expectedStateFunction' } }]
    };

    const expectedMapDispatch = {
      type: DECLARATION_TYPES.VAR_DECLARATION,
      declarations: [{ id: { name: 'expectedDispatchFunction' } }]
    };

    expect(extractMappingFunctions([
      {
        type: DECLARATION_TYPES.DEFAULT_EXPORT,
        declaration: {
          callee: {
            arguments: [
              { type: ARG_TYPES.IDENTIFIER, name: 'expectedStateFunction' },
              { type: ARG_TYPES.IDENTIFIER, name: 'expectedDispatchFunction' }
            ]
          }
        }
      },
      expectedMapState,
      expectedMapDispatch
    ])).toEqual({ mapStateToProps: expectedMapState, mapDispatchToProps: expectedMapDispatch });
  });
});
