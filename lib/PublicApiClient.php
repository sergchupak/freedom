<?php
namespace Nt;

/**
 * Class PublicApiClient
 * Tradernet public API client
 * @package Nt
 */
class PublicApiClient
{
    /**
     * @var string Адрес сервера API
     */
    protected $_apiUrl;

    /**
     * Идентификатор ключа
     * @var string
     */
    protected $_apiKey;

    /**
     * @var string Секретный ключ для подписи запросов
     */
    protected $_apiSecret;


    /**
     * @var int версия API
     */
    protected $_version;

    const V1 = 1;
    const V2 = 2;

    /**
     * @param string $apiKey
     * @param string $apiSecret
     * @param int $version версия API
     * @internal param string $restApiUrl
     */
    public function __construct ($apiKey = null, $apiSecret = null, $version = self::V1)
    {
        $this->_apiUrl  = 'https://tradernet.com/api';
        $this->_version = $version;

        $this->_apiKey    = $apiKey;
        $this->_apiSecret = $apiSecret;
    }

    /**
     * Отправка запроса на сервер REST API
     * @param string $method
     * @param array $aParams
     * @param string $format ['json'|'array']
     * @return mixed
     */
    public function sendRequest ($method, $aParams = null, $format = 'JSON')
    {
        $aReq = [
            'cmd'    => $method
        ];

        if($aParams) {
            $aReq['params'] = $aParams;
        }

        if ($this->_version != 1 && $this->_apiKey) {
            $aReq['apiKey'] = $this->_apiKey;
        }

        //if ($this->_version == self::V2) {
        $aReq['nonce'] = microtime(true) * 10000;
        //}

        $ch       = curl_init();
        $aHeaders = [];

        if ($this->_version == self::V1) {
            $preSig      = self::preSign($aReq);
            $aReq['sig'] = md5($preSig . $this->_apiSecret);
        } else {
            $aHeaders[] = 'X-NtApi-Sig: ' . self::calcSign($aReq, $this->_apiSecret);
        }

        // Если есть дополнительные заголовки - отправляем их
        if ($aHeaders) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $aHeaders);
        }

        $url = $this->_apiUrl . ($this->_version == self::V1 ? "" : "/v2/cmd/{$method}");

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, ($this->_version == self::V1 ? ['q' => json_encode($aReq)] : http_build_query($aReq)));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        if (($res = curl_exec($ch))) {
            if (strtolower($format) == 'json') {
                return $res;
            } else {
                return json_decode($res, true);
            }
        }
    }

    /**
     * Возвращает подпись для запроса
     * @param array $aQuery
     * @param string $apiSec
     * @return string
     */
    public static function calcSign ($aQuery, $apiSec)
    {
        return hash_hmac('sha256', self::preSign($aQuery), $apiSec);
    }

    /**
     * Метод для генерации строки для подписи
     * @static
     * @param $a
     * @return string
     */
    public static function preSign ($a)
    {
        $r = [];
        ksort($a);

        foreach ($a as $k => $v) {
            if (is_array($v)) {
                $v = self::preSign($v);
            }

            $r[] = "{$k}={$v}";
        }

        return implode('&', $r);
    }
}