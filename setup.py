from setuptools import setup


setup(
    name='dcps',
    version='0.1.0',
    author='Gupern <guperner@hotmail.com>',
    packages=[
        'dcps'
        ],
    scripts=[
        'bin/dcps',
        'bin/dcpsd'
        ],
    package_data={'': ['static/*', 'templates/*']},
    include_package_data=True,
    zip_safe=False
)
